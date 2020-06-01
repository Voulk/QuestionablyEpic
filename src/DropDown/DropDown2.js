import React from 'react';
import './DropDown.css';

class DropdownCommon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false,
      dropdowntext: 'Select Class',
      classes: ['Paladin', 'Rogue', 'Warrior', 'Mage', 'Warlock', 'Druid', 'Priest', 'Demon Hunter', 'Monk']
    }
    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }
showDropdownMenu = (event) => {
  event.preventDefault();
  this.setState({ displayMenu: true }, () => {
    document.addEventListener('click', this.hideDropdownMenu)
  })
}
  hideDropdownMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu)
    })
  }

  updatereporttoload = () => {
    this.setState({ reportload: this.state.reportid }, () => {
      document.removeEventListener('click', this.updatereporttoload);
    });
  }
  render() {
    return (
      <div className="dropdown">
        <div className="button" onClick={this.showDropdownMenu}> {this.state.dropdowntext} </div> 
        { this.state.displayMenu ? (<ul className="DropDownUL"> {this.state.classes.map(classes => (<li className="DropDownItem" key={classes}>{classes}</li>))}</ul>) : (null) }
      </div>
    );
  }
}
export default DropdownCommon;