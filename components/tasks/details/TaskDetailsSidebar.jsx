import {
  Box,
  Button,
  Card,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import classes from "@/styles/projects/projects.module.css";
import Image from "next/image";

const TaskDetailsSidebar = ({ task, onClose }) => {
  const {
    id,
    name,
    assignee,
    dueDate,
    description,
    categories,
    tags,
    comments,
    status,
  } = task;

  const EditIcon = (
    <Image
      src="/images/graphic/editing.png"
      width={20}
      height={20}
      alt="icon"
    />
  );
  const ShareIcon = (
    <Image src="/images/graphic/share.png" width={20} height={20} alt="icon" />
  );
  const CloseIcon = (
    <Image src="/images/graphic/close.png" width={20} height={20} alt="icon" />
  );

  return (
    <Box className={classes.task_details_wrapper}>
      <Card className={classes.task_details_sidebar}>
        <Box className={classes.task_details_buttons}>
          <Button startIcon={EditIcon} />
          <Button startIcon={ShareIcon} />
          <Button startIcon={CloseIcon} onClick={onClose} />
        </Box>
        <Box className={classes.task_details_top_info}>
          <div>
            <Typography variant="h4" fontWeight="bold">
              {name}
            </Typography>
          </div>
          <div className={classes.task_details_flex}>
            <Image
              src="/images/graphic/date.png"
              width={20}
              height={20}
              alt="date"
            />
            <Typography color="textSecondary">{dueDate}</Typography>
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
                (status === "To Do" && "todo") ||
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
            <Tooltip title={assignee} placement="top" key={assignee}>
              <IconButton size="large" className="iconBtn" />
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
                    (category === "Website" && "website")
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
            <form className={classes.task_details_form}>
              <TextField
                fullWidth
                placeholder="Enter New Comment"
                sx={{ mt: 1.2 }}
              />
              <Button variant="contained" type="submit">
                Publish
              </Button>
            </form>
          </div>
          <div>
            {comments.map((comment) => (
              <div key={comment.user} className={classes.task_details_comment}>
                <Image
                  src={comment.userImage}
                  width={60}
                  height={60}
                  alt={comment.user}
                />
                <div>
                  <Typography variant="p" fontWeight="bold">
                    {comment.user}
                  </Typography>
                  <Typography color="textSecondary">
                    {comment.comment}
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
