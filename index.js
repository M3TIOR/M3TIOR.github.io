var MUSCLE={
    bone:undefined,
    skin:undefined,
    muscle:undefined,
    load:function(){
        if (typeof(Storage) !== "undefined") {
            //Handle web storage when it's enabled
            initialize = function(name, value){
                    value = localStorage.getItem(name);
                    if(value == null || value == undefined)
                        value=true, localStorage.setItem(name, true);
            };
        } else {
            //Web storage unavailable, default to cookies.
            initialize = function(name, value){

            };
        }
        initialize("bone", this.bone);
        initialize("skin", this.skin);
        initialize("muscle", this.muscle);
    },

    end:0 // end of PAGE syntax easy because js is evil
};
