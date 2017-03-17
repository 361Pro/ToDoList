import React from 'react';

class UserAdd extends React.Component {
  constructor () {
    super();
    this.state = {
      name: '',
      password: '',
      email: ''
    };
  }
  handleValueChange (field, value, type = 'string') {
    if (type === 'number') {
      value = +value;
    }

    this.setState({
      [field]: value
    });
  }
  handleSubmit (e) {
    e.preventDefault();

    const {name, password, email} = this.state;
    fetch('http://localhost:3000/user', {
      method: 'post',
      body: JSON.stringify({
        name,
        password,
        email
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.id) {
          alert('Success!');
          this.setState({
            name: '',
            password: '',
            email: ''
          });
        } else {
          alert('Faild!');
        }
      })
      .catch((err) => console.error(err));
  }
  render () {
    const {name, password, email } = this.state;
    return (
      <div>
        <header>
          <h1>Add User</h1>
        </header>

        <main>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <label>Name：</label>
            <input type="text" value={name} onChange={(e) => this.handleValueChange('name', e.target.value)}/>
            <br/>
            <label>Password：</label>
            <input type="text" value={password} onChange={(e) => this.handleValueChange('password', e.target.value)}/>
            <br/>
            <label>Email：</label>
            <input type="text" value={email} onChange={(e) => this.handleValueChange('email', e.target.value)}/>
            <br/>
            <br/>
            <input type="submit" value="Submit"/>
          </form>
        </main>
      </div>
    );
  }
}

export default UserAdd;
