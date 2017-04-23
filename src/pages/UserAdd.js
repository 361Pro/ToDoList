import React from 'react';
import formProvider from '../utils/formProvider';

class UserAdd extends React.Component {
  handleSubmit (e) {
    e.preventDefault();

    const {form: {name, password, email}, formValid} = this.props;
    if (!formValid) {
      alert('Please enter valid information');
      return;
    }

    fetch('http://localhost:3000/user', {
      method: 'post',
      body: JSON.stringify({
        name: name.value,
        password: password.value,
        email: gender.value
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
          alert('Faild');
        }
      })
      .catch((err) => console.error(err));
  }
  render () {
    const {form: {name, password, email}, onFormChange} = this.props;
    return (
      <div>
        <header>
          <h1>Add User</h1>
        </header>

        <main>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <label>Name：</label>
            <input
              type="text"
              value={name.value}
              onChange={(e) => onFormChange('name', e.target.value)}
            />
            {!name.valid && <span>{name.error}</span>}
            <br/>
            <label>Password：</label>
            <input
              type="text"
              value={password.value || ''}
              onChange={(e) => onFormChange('password', +e.target.value)}
            />
            {!password.valid && <span>{password.error}</span>}
            <br/>
            <label>Email：</label>
            <input
              type="text"
              value={email.value || ''}
              onChange={(e) => onFormChange('email', +e.target.value)}
            />
            {!email.valid && <span>{email.error}</span>}
            <br/>
            <br/>
            <input type="submit" value="Submit"/>
          </form>
        </main>
      </div>
    );
  }
}

UserAdd = formProvider({
  name: {
    defaultValue: '',
    rules: [
      {
        pattern: function (value) {
          return value.length > 0;
        },
        error: 'Please enter your name'
      },
      {
        pattern: /^.{1,20}$/,
        error: 'Name should be less than 20 letters'
      }
    ]
  },
  password: {
    defaultValue: 0,
    rules: [
      {
        pattern: /^.{4,12}$/,
        error: 'Password should be number at length of 4-12'
      }
    ]
  },
  email: {
    defaultValue: '',
    rules: [
      {
        pattern: function (value) {
          return !!value;
        },
        error: 'Please enter email'
      }
    ]
  }
})(UserAdd);

export default UserAdd;
