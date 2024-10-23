import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import FormikTextInput from "../FormikTextInput";
import { Formik } from "formik";
import theme from "../../theme";
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  owner: yup
    .string()
    .required('Repository Owner name is required'),
  repository: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
  .min(0, 'The rating must be at least 0')
  .max(100, 'The rating cannot exceed 100')
    .required('Rating is required'),
  review: yup
    .string()
    .optional()
});
/**owner,
      repository,
      rating,
      review */

const ReviewForm = () => {

  const initialValues ={
    owner:'',
    repository:'',
    rating:'',
    review:''
  } 
  const onSubmit = async (values) => {
    const {owner,
      repository,
      rating,
      review} = values;
    try{
       await signUp({username,password})
    }catch(err){
      throw new Error(err.message);
    }
  };
  return (
    <View style={styles.viewContainer}>
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => (
        <View style={styles.formContainer}>
          <FormikTextInput
            name="owner"
            placeholder="Repository Owner name"
          />
          <FormikTextInput
            name="repository"
            placeholder="Repository name"
            secureTextEntry
          />
           <FormikTextInput
            name="rating"
            placeholder="Rating between 0 and 100"
          />
          <FormikTextInput
            name="review"
            placeholder="Review"
            secureTextEntry
          />
          <View style={styles.button}>
            <Pressable  onPress={handleSubmit} >
              <Text style={styles.buttonText}>Create a Review</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
    </View>
  )
};

const styles = StyleSheet.create({
  viewContainer:{
    display:'flex',
    alignContent:'center',
    justifyContent:'center',
    marginTop:50
  },
  formContainer:{
    margin:10
  },
  button: {
    display:'flex',
    alignItems:'center',
   
    backgroundColor:theme.colors.primary,
    padding:theme.paddings.normal,
    borderRadius:5,
    margin:theme.margins.normal,
    fontSize:theme.fontSizes.subheading
  },
  buttonText: {
    color:theme.colors.darkPrimary,
    fontSize:theme.fontSizes.subheading,
    fontWeight:theme.fontWeights.bold
  }
})
export default ReviewForm;