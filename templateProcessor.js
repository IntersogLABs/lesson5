/**
 * Created by IceBrick on 04.08.2015.
 */
(function (){
    template = function template(templateStr, options){
        var template = document.querySelector(templateStr);
        //if it is not selector then assume it ist template like plain string
        if(!template){
            template = templateStr;
        }
        else{
            template = template.innerHTML;
        }
        var parts = template.match(/(\[\[.*]])|(<[^\[\]]*>)/g);
        var result = resolveParts(parts, options);
        return result.join("");
    }
    function resolveParts(parts, options){
        var result = [];
        var execBloc = 0;
        var buffer = [];
        for(var i=0; i< parts.length; i++){
            var part = parts[i];
            if(isExecutable(part)){
                if(isEachStart(part)){
                    execBloc ++;
                    buffer.push(part);
                }
                else if(isEachEnd(part)) {
                    execBloc --;
                    if(!execBloc){
                        var bufferRes = executeBuffer(buffer,options);
                        result = result.concat(bufferRes);
                        buffer = [];
                    }
                    else{
                        buffer.push(part);
                    }
                }else{
                    if(execBloc){
                        buffer.push(part)
                    }
                    else{
                        result.push(options[getKey(part)]);
                    }
                }
            }
            else{
                if(execBloc){
                    buffer.push(part);
                }
                else{
                    result.push(part);
                }
            }
        }
        return result;
    }

    function isExecutable(str) {
        var r = /(\[\[.*]])/;
        return r.test(str);
    }
    function isEachStart(str) {
        var r = /\[\[.*each\s*(\S*)\s*in\s*(\S*)\s*]]/;
        return r.test(str)
    }
    function isEachEnd(str) {
        var r = /(\[\[\/.*each.*]])/;
        return r.test(str)
    }
    function getKey(str){
        var m = str.match(/\[\[(.*)]]/);
        return m[1];
    }
    function executeBuffer(buffer, option) {
        var eachOption = eachOptionParse(buffer[0]);
        var array = option[eachOption.inArr];
        var result = [];
        buffer.splice(0,1);
        for(var i=0;i<array.length;i++){
            var item = array[i];
            var op = [];
            op[eachOption.iter]=item;
            result = result.concat(resolveParts(buffer, op));
        }
        return result;


    }
    function eachOptionParse(str) {
        var r = /\[\[.*each\s*(\S*)\s*in\s*(\S*)\s*]]/;
        var m = str.match(r);
        return {
            iter: m[1],
            inArr: m[2]
        }
    }
})();