import {
  Box,
  Button,
  Card,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import classes from "@/styles/projects/projects.module.css";
import Image from "next/image";
import { useValidation } from "@/hooks/Auth/useValidation";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "@/utils/validators";
import { useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { useHttpPost } from "@/hooks/Http/useHttpPost";
import PropTypes from "prop-types";
import { ClipLoader } from "react-spinners";

const TaskDetailsSidebar = ({ task, onClose }) => {
  const {
    _id,
    title,
    assignedTo,
    finishDate,
    description,
    categories,
    tags,
    messages,
    status,
  } = task;

  const { sendPostRequest, isLoading } = useHttpPost();
  const { user } = useContext(AppContext);
  const [isEdit, setisEdit] = useState(false);

  const comment = useValidation([VALIDATOR_REQUIRE()]);
  const titleEdit = useValidation([VALIDATOR_MINLENGTH(3)]);
  const descriptionEdit = useValidation([VALIDATOR_MINLENGTH(20)]);
  const dateEdit = useValidation([VALIDATOR_REQUIRE()]);

  const postComment = async (e) => {
    e.preventDefault();
    const data = {
      message: comment.value,
      userId: user._id,
    };
    await sendPostRequest(`/api/tasks/${_id}`, "POST", data);
  };

  const editTask = async (e) => {
    e.preventDefault();
    const data = {
      title: titleEdit.value,
      description: descriptionEdit.value,
      date: dateEdit.value,
    };
    await sendPostRequest(`/api/tasks/${_id}`, "PATCH", data);
    setisEdit(false);
  };

  if (isLoading) {
    return (
      <div className="loader_wrapper">
        <ClipLoader />
      </div>
    );
  }

  const EditIcon = (
    <Image
      src="/images/graphic/editing.png"
      width={20}
      height={20}
      alt="icon"
    />
  );

  const CloseIcon = (
    <Image src="/images/graphic/close.png" width={20} height={20} alt="icon" />
  );

  return (
    <Box className={classes.task_details_wrapper}>
      <Card className={classes.task_details_sidebar}>
        <Box className={classes.task_details_buttons}>
          <Button
            startIcon={EditIcon}
            onClick={() => setisEdit((prevState) => !prevState)}
          />
          <Button startIcon={CloseIcon} onClick={onClose} />
        </Box>
        {isEdit ? (
          <form onSubmit={editTask}>
            <Box className={classes.task_details_top_info}>
              <div>
                <TextField
                  defaultValue={title}
                  fullWidth
                  onChange={titleEdit.onChangeInputHandler}
                  onBlur={titleEdit.onBlurInputHandler}
                  error={!titleEdit.isValid && titleEdit.isTouched}
                  helperText={
                    !titleEdit.isValid &&
                    titleEdit.isTouched &&
                    "Please enter valid title"
                  }
                />
              </div>
              <div className={classes.task_details_flex}>
                <TextField
                  defaultValue={description}
                  multiline
                  fullWidth
                  onChange={descriptionEdit.onChangeInputHandler}
                  onBlur={descriptionEdit.onBlurInputHandler}
                  error={!descriptionEdit.isValid && descriptionEdit.isTouched}
                  helperText={
                    !descriptionEdit.isValid &&
                    descriptionEdit.isTouched &&
                    "Please enter valid description"
                  }
                />
              </div>
              <div className={classes.task_details_flex}>
                <TextField
                  type="date"
                  fullWidth
                  onChange={dateEdit.onChangeInputHandler}
                  onBlur={dateEdit.onBlurInputHandler}
                  error={!dateEdit.isValid && dateEdit.isTouched}
                  helperText={
                    !dateEdit.isValid &&
                    dateEdit.isTouched &&
                    "Please enter valid date"
                  }
                />
              </div>
            </Box>
            <Button
              sx={{ marginTop: "20px", float: "right" }}
              variant="contained"
              type="submit"
            >
              Save
            </Button>
          </form>
        ) : (
          <>
            <Box className={classes.task_details_top_info}>
              <div>
                <Typography variant="h4" fontWeight="bold">
                  {title}
                </Typography>
              </div>
              <div className={classes.task_details_flex}>
                <Image
                  src="/images/graphic/date.png"
                  width={20}
                  height={20}
                  alt="date"
                />
                <Typography color="textSecondary">
                  {new Date(finishDate).toDateString()}
                </Typography>
              </div>
              <div className={classes.task_details_flex}>
                <Image
                  src="/images/graphic/charging-circle.png"
                  width={20}
                  height={20}
                  alt="status"
                />
                <Typography color="textSecondary">Status:</Typography>
                <div
                  className={
                    (status === "Todo" && "todo") ||
                    (status === "Work" && "work") ||
                    (status === "Lag" && "lag") ||
                    (status === "Done" && "done")
                  }
                >
                  {status}
                </div>
              </div>
              <div className={classes.task_details_flex}>
                <Image
                  src="/images/graphic/paper.png"
                  width={20}
                  height={20}
                  alt="paper"
                />
                <Typography color="textSecondary">Assigned to:</Typography>
                <Tooltip
                  title={assignedTo.username}
                  placement="top"
                  key={assignedTo.username}
                >
                  <Image
                    src={assignedTo.image}
                    width={60}
                    height={60}
                    alt={assignedTo.username}
                  />
                </Tooltip>
              </div>
            </Box>
            <hr />
            <Box className={classes.task_details_mid_info}>
              <div>
                <Typography variant="h6" fontWeight="bold">
                  Description
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 1.2 }}>
                  {description}
                </Typography>
              </div>
              <div>
                <Typography variant="h6" fontWeight="bold">
                  Categories
                </Typography>
                <div className={classes.task_details_categories}>
                  {categories.map((category) => (
                    <div
                      className={
                        (category === "Development" && "development") ||
                        (category === "Design" && "design") ||
                        (category === "Management" && "management") ||
                        (category === "Website" && "website") ||
                        classes.task_category
                      }
                      key={category}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Typography variant="h6" fontWeight="bold">
                  Tags
                </Typography>
                <div className={classes.task_details_tags}>
                  {tags.map((tag) => (
                    <Typography
                      sx={{
                        borderLeft: "6px solid royalblue",
                        paddingLeft: "12px",
                      }}
                      fontWeight="bold"
                      key={tag}
                    >
                      {tag}
                    </Typography>
                  ))}
                </div>
              </div>
            </Box>
          </>
        )}

        <hr />
        <Box className={classes.task_details_comments}>
          <div>
            <Typography variant="h6" fontWeight="bold">
              Comments
            </Typography>
            <form className={classes.task_details_form} onSubmit={postComment}>
              <TextField
                fullWidth
                placeholder="Enter New Comment"
                sx={{ mt: 1.2 }}
                label="Comment"
                onChange={comment.onChangeInputHandler}
                onBlur={comment.onBlurInputHandler}
                value={comment.value}
                error={!comment.isValid && comment.isTouched}
                helperText={
                  !comment.isValid &&
                  comment.isTouched &&
                  "Please enter valid comment"
                }
                required
              />
              <Button
                variant="contained"
                type="submit"
                disabled={!comment.isValid}
              >
                Publish
              </Button>
            </form>
          </div>
          <div style={{ marginTop: "20px" }}>
            {messages.map((message) => (
              <div key={message._id} className={classes.task_details_comment}>
                <Image
                  src={message.image}
                  width={60}
                  height={60}
                  alt={message.username}
                />
                <div>
                  <Typography variant="p" fontWeight="bold">
                    {message.username}
                  </Typography>
                  <Typography color="textSecondary">
                    {message.message}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </Box>
      </Card>
    </Box>
  );
};

TaskDetailsSidebar.propTypes = {
  task: PropTypes.object,
  onClose: PropTypes.func,
};

export default TaskDetailsSidebar;
