import KanbanType from "@/components/tasks/KanbanType";
import ListType from "@/components/tasks/ListType";
import Image from "next/image";
import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const ProjectTasks = ({
  setisTypeTask,
  isTypeTask,
  classes,
  openDetailsHandler,
  projectMb,
}) => {
  const todoTasks = projectMb.tasks.filter((task) => task.status === "Todo");
  const doneTasks = projectMb.tasks.filter((task) => task.status === "Done");
  const workTasks = projectMb.tasks.filter((task) => task.status === "Work");
  const lagTasks = projectMb.tasks.filter((task) => task.status === "Lag");

  const [columns, setColumns] = useState([
    { id: "s1", title: "Todo", tasks: todoTasks, color: "#7638dc" },
    { id: "s2", title: "Work", tasks: workTasks, color: "#daa000" },
    { id: "s3", title: "Lag", tasks: lagTasks, color: "#ff4229" },
    { id: "s4", title: "Done", tasks: doneTasks, color: "#1cc800" },
  ]);

  useEffect(() => {
    setColumns([
      { id: "s1", title: "Todo", tasks: todoTasks, color: "#7638dc" },
      { id: "s2", title: "Work", tasks: workTasks, color: "#daa000" },
      { id: "s3", title: "Lag", tasks: lagTasks, color: "#ff4229" },
      { id: "s4", title: "Done", tasks: doneTasks, color: "#1cc800" },
    ]);
  }, [projectMb.tasks]);

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
          columns={columns}
          openDetailsHandler={openDetailsHandler}
          projectMb={projectMb}
        />
      ) : (
        <ListType
          columns={columns}
          openDetailsHandler={openDetailsHandler}
          projectMb={projectMb}
        />
      )}
    </Box>
  );
};

ProjectTasks.propTypes = {
  setisTypeTask: PropTypes.func,
  isTypeTask: PropTypes.string,
  classes: PropTypes.object,
  openDetailsHandler: PropTypes.func,
  projectMb: PropTypes.object,
};

export default ProjectTasks;
