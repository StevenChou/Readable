import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createPost } from './../actions/action_posts';
import { _uuid } from '../utils/helpers';

class PostsNew extends Component {
  componentDidMount() {
    // const { type, back } = this.props.match.params;
    // console.log('@trace type', type);
    // console.log('@trace back', back);
    // console.log('@categories', this.props.categories.length);
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''} `;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    );
  }

  renderSelField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''} `;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <select className="form-control" {...field.input}>
          <option value="">Select a category...</option>
          {this.props.categories.map(category => (
            <option value={category.name} key={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    );
  }

  onSubmit(values) {
    values['id'] = _uuid();
    values['timestamp'] = Date.now();
    const { back } = this.props.match.params;

    // console.log('!!! values', values)
    this.props.createPost(values, () => {
      if (back === 'index') {
        this.props.history.push('/');
      } else {
        this.props.history.push(`/${back}`);
      }
    });
  }

  render() {
    // console.log('trace init ', this.props.initialValues)
    const { handleSubmit } = this.props;
    const { back } = this.props.match.params;
    let backURL = '';
    if (back === 'index') backURL = '/';
    else backURL = `/${back}`;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title For Post"
          name="title"
          component={this.renderField}
        />
        <Field label="Post Content" name="body" component={this.renderField} />
        <Field label="Author" name="author" component={this.renderField} />
        <Field
          label="Categories"
          name="category"
          component={this.renderSelField.bind(this)}
        />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to={backURL} className="btn btn-danger a-margin">
          Cancel
        </Link>
      </form>
    );
  }
}

// It be call automatically when submit
function validate(values) {
  const errors = {};
  // console.log('???? values', values)
  // Validate the inputs from 'values'
  if (!values.title || values.title.length < 3) {
    // field name property
    errors.title = 'Enter the title that is least 3 charaters!';
  }

  if (!values.body) {
    // field name property
    errors.body = 'Enter some content please!';
  }

  if (!values.author) {
    // field name property
    errors.author = 'Enter the author please!';
  }

  if (!values.category) {
    // field name property
    errors.category = 'Select the category!';
  }

  return errors;
}

function mapStateToProps(state) {
  return { categories: state.categories };
}

export default reduxForm({
  // validate: validate,
  validate,
  form: 'PostsNewForm' // name of the form
})(
  // return react component
  connect(mapStateToProps, { createPost })(PostsNew)
);
