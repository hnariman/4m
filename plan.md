inputs:
- buttons  (L,R)
- select (L,R)
- input (L,R)


outputs:
- inputs (L,R)
- display (L,R)


  buttons.event => buttonClick() {
    checkSide();
    calculator();
    render();
  }

select.event => selectChange() {

    checkSide();
    calculator();
    render();
}


==================================

click => handler => calculator(  async rate ) => render
