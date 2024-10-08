import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  selectCurrentContact,
  selectEditIsOpen,
} from "../../redux/contacts/selectors";
import {
  Backdrop,
  Fade,
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { editContact } from "../../redux/contacts/operations";
import { closeEditModal, setCurrentContact } from "../../redux/contacts/slice";
import toast from "react-hot-toast";

export default function EditModal() {
  const isOpen = useSelector(selectEditIsOpen);
  const dispatch = useDispatch();
  const currentContact = useSelector(selectCurrentContact);

  const initialValues = currentContact;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "300px", sm: "400px" },
    bgcolor: "rgba(212, 231, 255, 0.7)",
    borderRadius: 2,
    border: "none",
    boxShadow: 24,
    p: 4,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too short! Minimum 3 letters.")
      .max(50, "Too long! Maximum 50 letters.")
      .required("Name is required!"),
    number: Yup.string()
      .matches(
        /^[+]?[\d\s()-]*$/,
        "Phone number can only contain digits, spaces, dashes, parentheses, and a plus sign."
      )
      .min(3, "Too short! Minimum 3 digits.")
      .max(17, "Too long! Maximum 17 characters.")
      .required("Phone number is required!"),
  });

  const handleEdit = (values, actions) => {
    dispatch(editContact(values));
    actions.resetForm();
    dispatch(closeEditModal());
    toast.success("Changes saved");
  };

  const handleCancel = () => {
    dispatch(closeEditModal());
    dispatch(setCurrentContact(null));
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleCancel}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            <Formik
              initialValues={initialValues}
              onSubmit={handleEdit}
              validationSchema={validationSchema}
            >
              {({ isValid, dirty }) => (
                <Form>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ textAlign: "center", marginBottom: "16px" }}
                  >
                    Edit your contact:
                  </Typography>

                  <Field
                    name="name"
                    as={TextField}
                    label="Name"
                    variant="outlined"
                    helperText={<ErrorMessage name="name" />}
                    sx={{ width: "100%", marginBottom: "16px" }}
                  />

                  <Field
                    name="number"
                    as={TextField}
                    label="Number"
                    variant="outlined"
                    helperText={<ErrorMessage name="number" />}
                    sx={{ width: "100%", marginBottom: "16px" }}
                  />

                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!isValid || !dirty}
                      sx={{
                        backgroundColor: "rgba(65, 116, 177, 0.7)",
                        width: "100px",
                      }}
                    >
                      Save
                    </Button>

                    <Button
                      type="button"
                      onClick={handleCancel}
                      variant="contained"
                      sx={{
                        backgroundColor: "rgba(65, 116, 177, 0.7)",
                        width: "100px",
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
