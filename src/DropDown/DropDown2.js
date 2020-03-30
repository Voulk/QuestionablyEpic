window.styled = window.styled.default;

const Container = styled.div`
  font-size: 2rem;
  border-radius: 20px 20px 20px 20px;
  margin: 0 auto;
  width: 400px;
  transition: .2s all;
  height: ${props =>
      props.dropDownOpen ? 100 + props.dropDownArr.length * 100   + 'px' : '100px'}
  background-color: lightgrey;
  display: flex;
  flex-direction: column;
`;
const DropDownMenu = styled.div`
  cursor: pointer;
  height: 100px;
  width: 400px;
  border-radius: 20px 20px 0px 0px;
  background-color: grey;
  display: flex;
  text-align: center;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  &:hover {
    background-color: darkgrey;
  }
`;
const DropDownItem = styled.div`
  flex: 1;
  color: black;
  background-color: lightgrey;
  border-bottom: 1px solid grey;
  display: flex;
  text-align: center;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  transition: 0.2s all;
  &:hover {
    background-color: orange;
    color: white;
  }
  &:last-child {
    border-radius: 0px 0px 20px 20px;
  }
`;

class DropDown2 extends React.Component {
  state = { dropDownOpen: false };

  toggleDropDown = () =>
    this.setState({ dropDownOpen: !this.state.dropDownOpen });

  render() {
    const title = 'Click Me';
    const dropDownArr = ['item1', 'item2', 'item3'];
    return (
      <Container
        dropDownOpen={this.state.dropDownOpen}
        dropDownArr={dropDownArr}
      >
        <DropDownMenu
          onClick={() => this.toggleDropDown()}
        >
          <div>{title}</div>
        </DropDownMenu>
        {this.state.dropDownOpen
          ? dropDownArr.map(item => {
            return (
              <DropDownItem 
                onClick={() => alert('You Clicked an Item!')}> 
                <div>{item}</div>
              </DropDownItem>
            );
          })
          : null}
      </Container>
    );
  }
}

ReactDOM.render(<DropDown />, document.getElementById('app'));