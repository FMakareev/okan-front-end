

export const documentOffsetTop = ()=>{
  try{
    if(Element){
      Element.prototype.documentOffsetTop = function () {
        return this.offsetTop + ( this.offsetParent ? this.offsetParent.documentOffsetTop() : 0 );
      };
    }
  } catch (e) {
  }

}
