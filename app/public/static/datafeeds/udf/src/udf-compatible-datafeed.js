import * as tslib_1 from "tslib";
import { UDFCompatibleDatafeedBase } from './udf-compatible-datafeed-base';
import { QuotesProvider } from './quotes-provider';
import { Requester } from './requester';

const UDFCompatibleDatafeed = /** @class */ (function (_super) {
  tslib_1.__extends(UDFCompatibleDatafeed, _super);
  function UDFCompatibleDatafeed(datafeedURL, updateFrequency) {
    if (updateFrequency === void 0) { updateFrequency = 10 * 1000; }
    let _this = this;
    const requester = new Requester();
    const quotesProvider = new QuotesProvider(datafeedURL, requester);
    _this = _super.call(this, datafeedURL, quotesProvider, requester, updateFrequency) || this;
    return _this;
  }
  return UDFCompatibleDatafeed;
}(UDFCompatibleDatafeedBase));
export { UDFCompatibleDatafeed };
