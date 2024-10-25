const developers = [
  { name: "Alice", skillLevel: 7, maxHours: 40, preferredTaskType: "feature" },
  { name: "Bob", skillLevel: 9, maxHours: 30, preferredTaskType: "bug" },
  {
    name: "Charlie",
    skillLevel: 5,
    maxHours: 35,
    preferredTaskType: "refactor",
  },
];

const tasks = [
  {
    taskName: "Feature A",
    difficulty: 7,
    hoursRequired: 15,
    taskType: "feature",
    priority: 4,
    dependencies: [],
  },
  {
    taskName: "Bug Fix B",
    difficulty: 5,
    hoursRequired: 10,
    taskType: "bug",
    priority: 5,
    dependencies: [],
  },
  {
    taskName: "Refactor C",
    difficulty: 9,
    hoursRequired: 25,
    taskType: "refactor",
    priority: 3,
    dependencies: ["Bug Fix B"],
  },
  {
    taskName: "Optimization D",
    difficulty: 6,
    hoursRequired: 20,
    taskType: "feature",
    priority: 2,
    dependencies: [],
  },
  {
    taskName: "Upgrade E",
    difficulty: 8,
    hoursRequired: 15,
    taskType: "feature",
    priority: 5,
    dependencies: ["Feature A"],
  },
];

function assignTasksWithPriorityAndDependencies(developers, tasks) {
  // To prioritize high priority task by sorting them
  tasks.sort((a, b) => b.priority - a.priority);

  const unassignedTasks = [];

  //To assign tasks to appropriate developers
  developers.forEach((dev) => {
    dev.assignedTasks = [];
    dev.totalWorkHours = 0;
  });

  //To check each developer to see if the developer is suitable to a task or not,
  //if yes, the task will be assigned to that developer,
  //however, if not, the task will be pushed to unassignedTasks array
  tasks.forEach((task) => {
    let assigned = false;
    for (const developer of developers) {
      // Check if developer is suitable by skill level, work hours, preferredTaskType
      if (
        developer.skillLevel >= task.difficulty &&
        developer.maxHours >= task.hoursRequired &&
        developer.preferredTaskType === task.taskType
      ) {
        // Check if dependencies are met
        if (
          task.dependencies.every((dep) =>
            developers.some((dev) => dev.assignedTasks.includes(dep))
          )
        ) {
          developer.assignedTasks.push(task.taskName);
          developer.maxHours -= task.hoursRequired;
          developer.totalWorkHours += task.hoursRequired;
          assigned = true;

          break;
        }
      }
    }
    if (!assigned) {
      unassignedTasks.push(task);
    }
  });

  // Return developers array with their names, assigned tasks and total work hours
  const developersWithAssignedTasks = developers.map((dev) => ({
    name: dev.name,
    assignedTasks: dev.assignedTasks,
    totalWorkHours: dev.totalWorkHours,
  }));

  return { developersWithAssignedTasks, unassignedTasks };
}

//To show the result in a clear and readable json form
console.log(
  JSON.stringify(
    assignTasksWithPriorityAndDependencies(developers, tasks),
    null,
    2
  )
);
