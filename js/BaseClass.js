class BaseClass{
    set params(params){
        if(this._paramsSet){
            return this.params;
        }
        for(const p in params){
            this["_"+p]=params[p];
        }
        this._params=params;
        this._paramsSet=true;
        return this.params;
    }
    get params(){
        return this._params;
    }
    constructor(params){
        this.params=params
    }
}