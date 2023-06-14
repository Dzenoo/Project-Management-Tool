import KanbanType from "@/components/tasks/KanbanType";
import ListType from "@/components/tasks/ListType";
import Image from "next/image";
import { Box, Button } from "@mui/material";
import PropTypes, { object } from "prop-types";

const ProjectTasks = ({
  setisTypeTask,
  isTypeTask,
  classes,
  workTasks,
  doneTasks,
  todoTasks,
  lagTasks,
  openDetailsHandler,
}) => {
  return (
    <Box className={classes.main_tasks_dashboard}>
      <Box className={classes.show_actions}>
        <Button
          onClick={() => setisTypeTask("kanban")}
          variant={isTypeTask === "kanban" && "contained"}
        >
          <Image
            src="/images/graphic/kanban.png"
            width={40}
            height={40}
            alt="img"
          />
          Kanban
        </Button>
        <Button
          size="large"
          onClick={() => setisTypeTask("list")}
          variant={isTypeTask === "list" && "contained"}
        >
          <Image
            src="/images/graphic/list.png"
            width={40}
            height={40}
            alt="img"
          />
          List View
        </Button>
      </Box>
      <br />
      <hr />
      {isTypeTask === "kanban" ? (
        <KanbanType
          workTasks={workTasks}
          doneTasks={doneTasks}
          todoTasks={todoTasks}
          lagTasks={lagTasks}
          openDetailsHandler={openDetailsHandler}
        />
      ) : (
        <ListType
          workTasks={workTasks}
          doneTasks={doneTasks}
          todoTasks={todoTasks}
          lagTasks={lagTasks}
          openDetailsHandler={openDetailsHandler}
        />
      )}
    </Box>
  );
};

ProjectTasks.propTypes = {
  setisTypeTask: PropTypes.func,
  isTypeTask: PropTypes.string,
  workTasks: PropTypes.arrayOf(object),
  doneTasks: PropTypes.arrayOf(object),
  todoTasks: PropTypes.arrayOf(object),
  lagTasks: PropTypes.arrayOf(object),
};

export default ProjectTasks;
