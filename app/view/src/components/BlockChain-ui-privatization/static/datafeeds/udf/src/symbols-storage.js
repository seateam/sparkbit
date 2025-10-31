import { getErrorMessage, logMessage } from './helpers';

function extractField(data, field, arrayIndex, valueIsArray) {
  const value = data[field];
  if (Array.isArray(value) && (!valueIsArray || Array.isArray(value[0]))) {
    return value[arrayIndex];
  }
  return value;
}
const SymbolsStorage = /** @class */ (function () {
  function SymbolsStorage(datafeedUrl, datafeedSupportedResolutions, requester) {
    this._exchangesList = ['NYSE', 'FOREX', 'AMEX'];
    this._symbolsInfo = {};
    this._symbolsList = [];
    this._datafeedUrl = datafeedUrl;
    this._datafeedSupportedResolutions = datafeedSupportedResolutions;
    this._requester = requester;
    this._readyPromise = this._init();
    this._readyPromise.catch((error) => {
      // seems it is impossible
      // tslint:disable-next-line:no-console
      console.error(`SymbolsStorage: Cannot init, error=${error.toString()}`);
    });
  }
  // BEWARE: this function does not consider symbol's exchange
  SymbolsStorage.prototype.resolveSymbol = function (symbolName) {
    const _this = this;
    return this._readyPromise.then(() => {
      const symbolInfo = _this._symbolsInfo[symbolName];
      if (symbolInfo === undefined) {
        return Promise.reject('invalid symbol');
      }
      return Promise.resolve(symbolInfo);
    });
  };
  SymbolsStorage.prototype.searchSymbols = function (searchString, exchange, symbolType, maxSearchResults) {
    const _this = this;
    return this._readyPromise.then(() => {
      const weightedResult = [];
      const queryIsEmpty = searchString.length === 0;
      searchString = searchString.toUpperCase();
      const _loop_1 = function (symbolName) {
        const symbolInfo = _this._symbolsInfo[symbolName];
        if (symbolInfo === undefined) {
          return "continue";
        }
        if (symbolType.length > 0 && symbolInfo.type !== symbolType) {
          return "continue";
        }
        if (exchange && exchange.length > 0 && symbolInfo.exchange !== exchange) {
          return "continue";
        }
        const positionInName = symbolInfo.name.toUpperCase().indexOf(searchString);
        const positionInDescription = symbolInfo.description.toUpperCase().indexOf(searchString);
        if (queryIsEmpty || positionInName >= 0 || positionInDescription >= 0) {
          const alreadyExists = weightedResult.some(item => item.symbolInfo === symbolInfo);
          if (!alreadyExists) {
            const weight = positionInName >= 0 ? positionInName : 8000 + positionInDescription;
            weightedResult.push({ symbolInfo, weight });
          }
        }
      };
      for (let _i = 0, _a = _this._symbolsList; _i < _a.length; _i++) {
        const symbolName = _a[_i];
        _loop_1(symbolName);
      }
      const result = weightedResult
        .sort((item1, item2) => item1.weight - item2.weight)
        .slice(0, maxSearchResults)
        .map((item) => {
          const { symbolInfo } = item;
          return {
            symbol: symbolInfo.name,
            full_name: symbolInfo.full_name,
            description: symbolInfo.description,
            exchange: symbolInfo.exchange,
            params: [],
            type: symbolInfo.type,
            ticker: symbolInfo.name,
          };
        });
      return Promise.resolve(result);
    });
  };
  SymbolsStorage.prototype._init = function () {
    const _this = this;
    const promises = [];
    const alreadyRequestedExchanges = {};
    for (let _i = 0, _a = this._exchangesList; _i < _a.length; _i++) {
      const exchange = _a[_i];
      if (alreadyRequestedExchanges[exchange]) {
        continue;
      }
      alreadyRequestedExchanges[exchange] = true;
      promises.push(this._requestExchangeData(exchange));
    }
    return Promise.all(promises)
      .then(() => {
        _this._symbolsList.sort();
        logMessage('SymbolsStorage: All exchanges data loaded');
      });
  };
  SymbolsStorage.prototype._requestExchangeData = function (exchange) {
    const _this = this;
    return new Promise(((resolve, reject) => {
      _this._requester.sendRequest(_this._datafeedUrl, 'symbol_info', { group: exchange })
        .then((response) => {
          try {
            _this._onExchangeDataReceived(exchange, response);
          } catch (error) {
            reject(error);
            return;
          }
          resolve();
        })
        .catch((reason) => {
          logMessage(`SymbolsStorage: Request data for exchange '${exchange}' failed, reason=${getErrorMessage(reason)}`);
          resolve();
        });
    }));
  };
  SymbolsStorage.prototype._onExchangeDataReceived = function (exchange, data) {
    let symbolIndex = 0;
    try {
      const symbolsCount = data.symbol.length;
      const tickerPresent = data.ticker !== undefined;
      for (; symbolIndex < symbolsCount; ++symbolIndex) {
        const symbolName = data.symbol[symbolIndex];
        const listedExchange = extractField(data, 'exchange-listed', symbolIndex);
        const tradedExchange = extractField(data, 'exchange-traded', symbolIndex);
        const fullName = `${tradedExchange}:${symbolName}`;
        const ticker = tickerPresent ? extractField(data, 'ticker', symbolIndex) : symbolName;
        const symbolInfo = {
          ticker,
          name: symbolName,
          base_name: [`${listedExchange}:${symbolName}`],
          full_name: fullName,
          listed_exchange: listedExchange,
          exchange: tradedExchange,
          description: extractField(data, 'description', symbolIndex),
          has_intraday: definedValueOrDefault(extractField(data, 'has-intraday', symbolIndex), false),
          has_no_volume: definedValueOrDefault(extractField(data, 'has-no-volume', symbolIndex), false),
          minmov: extractField(data, 'minmovement', symbolIndex) || extractField(data, 'minmov', symbolIndex) || 0,
          minmove2: extractField(data, 'minmove2', symbolIndex) || extractField(data, 'minmov2', symbolIndex),
          fractional: extractField(data, 'fractional', symbolIndex),
          pricescale: extractField(data, 'pricescale', symbolIndex),
          type: extractField(data, 'type', symbolIndex),
          session: extractField(data, 'session-regular', symbolIndex),
          timezone: extractField(data, 'timezone', symbolIndex),
          supported_resolutions: definedValueOrDefault(extractField(data, 'supported-resolutions', symbolIndex, true), this._datafeedSupportedResolutions),
          force_session_rebuild: extractField(data, 'force-session-rebuild', symbolIndex),
          has_daily: definedValueOrDefault(extractField(data, 'has-daily', symbolIndex), true),
          intraday_multipliers: definedValueOrDefault(extractField(data, 'intraday-multipliers', symbolIndex, true), ['1', '5', '15', '30', '60']),
          has_weekly_and_monthly: extractField(data, 'has-weekly-and-monthly', symbolIndex),
          has_empty_bars: extractField(data, 'has-empty-bars', symbolIndex),
          volume_precision: definedValueOrDefault(extractField(data, 'volume-precision', symbolIndex), 0),
          format: 'price',
        };
        this._symbolsInfo[ticker] = symbolInfo;
        this._symbolsInfo[symbolName] = symbolInfo;
        this._symbolsInfo[fullName] = symbolInfo;
        this._symbolsList.push(symbolName);
      }
    } catch (error) {
      throw new Error(`SymbolsStorage: API error when processing exchange ${exchange} symbol #${symbolIndex} (${data.symbol[symbolIndex]}): ${error.message}`);
    }
  };
  return SymbolsStorage;
}());
export { SymbolsStorage };
function definedValueOrDefault(value, defaultValue) {
  return value !== undefined ? value : defaultValue;
}
