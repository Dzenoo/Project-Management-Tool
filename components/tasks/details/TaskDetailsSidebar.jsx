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
import { VALIDATOR_REQUIRE } from "@/utils/validators";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useHttpPost } from "@/hooks/Http/useHttpPost";
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

  const comment = useValidation([VALIDATOR_REQUIRE()]);
  const { sendPostRequest, isLoading } = useHttpPost();
  const { user } = useContext(AppContext);

  const postComment = async (e) => {
    e.preventDefault();
    const data = {
      message: comment.value,
      userId: user._id,
    };
    await sendPostRequest(`/api/tasks/${_id}`, "POST", data);
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
          <Button startIcon={EditIcon} />
          <Button startIcon={CloseIcon} onClick={onClose} />
        </Box>
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

export default TaskDetailsSidebar;
