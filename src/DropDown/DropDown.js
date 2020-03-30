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
    };
    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

  }

 
showDropdownMenu = (event) => {
  event.preventDefault();
  this.setState({
    displayMenu: true,
    reportid: this.props.reportid}, () => {
    document.addEventListener('click', this.hideDropdownMenu);
  });
}

  hideDropdownMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }

  updatereporttoload = () => {
    this.setState({ reportload: this.state.reportid }, () => {
      document.removeEventListener('click', this.updatereporttoload);
      console.log(this.state.reportload)
    });
  }

  render() {
    return (
      <div className="dropdown">
        <div className="button" onClick={this.showDropdownMenu}> {this.state.dropdowntext} </div> 
        { this.state.displayMenu ? (<LogImport reportid = {this.state.reportid} />) : (null) }
      </div>
    );
  }
}

export default Dropdown;

// <li><a className="active" href="#Create Page">Create Page</a></li>
// <li><a>Fight 1</a></li>
// <li><a>Create Ads</a></li>
// <li><a>Manage Ads</a></li>
// <li><a>Activity Logs</a></li>
// <li><a>Setting</a></li>
// <li><a>Log Out</a></li>
// this.updatereporttoload,