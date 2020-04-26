import React from 'react';
import './DropDown.css';
import LogImport from '../LogImport/LogImport';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false,
      dropdowntext: 'Select Fight',
      reportid: this.props.reportid
    }
    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }
showDropdownMenu = (event) => {
  event.preventDefault();
  this.setState({
    displayMenu: true,
    reportid: this.props.reportid}, () => {
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
  render(props) {
    return (
      <div className="dropdown">
        <div className="button" onClick={this.showDropdownMenu}> {this.state.dropdowntext} </div> 
        { this.state.displayMenu ? (<LogImport reportid = {this.state.reportid} clicker={this.props.clicky}/>) : (null) }
      </div>
    );
  }
}
export default Dropdown;

