import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import NoRecordPage from "./norecord-componet";
import CopyRightPage from "./copyright.component";
import {
 
  MDBView,
  MDBContainer
} from 'mdbreact';
export default class EmployeeList extends Component {
    constructor(props) {
      super(props);
      this.onChangeSearchName = this.onChangeSearchName.bind(this);
      this.retrieveEmployees = this.retrieveEmployees.bind(this);
      this.refreshList = this.refreshList.bind(this);
  
      this.state = {
        employees: [],
        currentEmployee: null,
        currentIndex: -1,
        searchName: ""
      };
     }
     componentDidMount() {
        this.retrieveEmployees();
      }
    
      onChangeSearchName(e) {
        const searchTitle = e.target.value;
    
        this.setState({
          searchTitle: searchTitle
        });
      }

      retrieveEmployees() {
        EmployeeDataService.getAll()
          .then(response => {
            this.setState({
                employees: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      refreshList() {
        this.retrieveEmployees();
        this.setState({
          currentEmployee: null,
          currentIndex: -1
        });
      }
      setActiveEmployee(employee, index) {
        this.setState({
          currentEmployee: employee,
          currentIndex: index
        });
      }

   
      render() {
        const { employees, currentEmployee, currentIndex } = this.state;
        if (employees.length === 0) {
          return <NoRecordPage/>
        } else {
        return (
            
            <div>
              <MDBView>
              <MDBContainer
            style={{ height: '100%', width: '100%', paddingTop: '10rem' }}
            className='d-flex justify-content-center black-text align-items-center'/>
            </MDBView>
            <div className="list row">
               <div className="col -md-6">
                <h4>Employees List</h4>
                <ul className="list-group">
                  {employees && 
                    employees.map((employee, index) => (
                      <li
                        className={
                          "list-group-item " +
                          (index === currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveEmployee(employee, index)}
                        key={index}
                       >
                        {employee.employeeName}
                      </li>
                    ))}
                </ul>
              </div>
              <MDBView>
              <MDBContainer
            style={{ height: '100%', width: '100%', paddingTop: '10rem' }}
            className='d-flex justify-content-center black-text align-items-center'
          />
            </MDBView>
              <div className="col-md-6">
                {currentEmployee ? (
                  <div>
                    <h4>Employee</h4>
                    <div>
                      <label>
                        <strong>Name:</strong>
                      </label>{" "}
                      {currentEmployee.employeeName}
                    </div>
                    <div>
                      <label>
                        <strong>Email ID:</strong>
                      </label>{" "}
                      {currentEmployee.emailID}
                    </div>
                    <div>
                      <label>
                        <strong>Contact No:</strong>
                      </label>{" "}
                      {currentEmployee.contactNo}
                    </div>
                   </div>
                ) : (
                  <div>
                    <br />
                    <p></p>
                  </div>
                )}
              </div>
            </div>
            <CopyRightPage/>
            </div>
          );
      }
    }
    }