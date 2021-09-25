import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface TaskEdit {
  taskId: number,
  taskNewTitle: string,
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExist = tasks.find((task) => task.title === newTaskTitle)
    if (taskAlreadyExist) {
      return (
        Alert.alert(
          "Task já cadastrada",
          "Você não pode cadastrar uma task com o mesmo nome",
        )
      )
    }
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks(prev => [...prev, newTask])
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map(task => ({ ...task }))
    const markedTask = updatedTasks.find(task => task.id === id)
    if (markedTask) {
      markedTask.done = !markedTask.done
      setTasks(updatedTasks)
    }
  }

  function handleEditTask({taskId, taskNewTitle} : TaskEdit) {
    const tasksToUpdate = tasks.map(task => ({ ...task }))
    const taskUpdating = tasksToUpdate.find(task => task.id === taskId)
    if (taskUpdating) {
      taskUpdating.title = taskNewTitle
      setTasks(tasksToUpdate)
    }
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          style: "destructive",
          onPress: () => setTasks(prev => prev.filter(element => element.id !== id))
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})