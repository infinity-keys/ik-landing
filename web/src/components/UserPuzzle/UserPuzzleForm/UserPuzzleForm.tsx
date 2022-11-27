import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditUserPuzzleById, UpdateUserPuzzleInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'




type FormUserPuzzle = NonNullable<EditUserPuzzleById['userPuzzle']>

interface UserPuzzleFormProps {
  userPuzzle?: EditUserPuzzleById['userPuzzle']
  onSave: (data: UpdateUserPuzzleInput, id?: FormUserPuzzle['id']) => void
  error: RWGqlError
  loading: boolean
}

const UserPuzzleForm = (props: UserPuzzleFormProps) => {
  const onSubmit = (data: FormUserPuzzle) => {
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.userPuzzle?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormUserPuzzle> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>
        
          <TextField
            name="userId"
            defaultValue={props.userPuzzle?.userId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        
          <TextField
            name="name"
            defaultValue={props.userPuzzle?.name}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="slug"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Slug
        </Label>
        
          <TextField
            name="slug"
            defaultValue={props.userPuzzle?.slug}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="slug" className="rw-field-error" />

        <Label
          name="explanation"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Explanation
        </Label>
        
          <TextField
            name="explanation"
            defaultValue={props.userPuzzle?.explanation}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="explanation" className="rw-field-error" />

        <Label
          name="successMessage"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Success message
        </Label>
        
          <TextField
            name="successMessage"
            defaultValue={props.userPuzzle?.successMessage}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="successMessage" className="rw-field-error" />

        <Label
          name="challenge"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Challenge
        </Label>
        
          <TextField
            name="challenge"
            defaultValue={props.userPuzzle?.challenge}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="challenge" className="rw-field-error" />

        <Label
          name="solution"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Solution
        </Label>
        
          <TextField
            name="solution"
            defaultValue={props.userPuzzle?.solution}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="solution" className="rw-field-error" />

        <Label
          name="imageUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Image url
        </Label>
        
          <TextField
            name="imageUrl"
            defaultValue={props.userPuzzle?.imageUrl}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="imageUrl" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default UserPuzzleForm
