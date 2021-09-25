import React, { useEffect, useRef, useState } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';

import { TaskEdit } from '../pages/Home';
import { Task } from './TasksList';

interface TasksItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({taskId, taskNewTitle} : TaskEdit) => void;
}
export function TaskItem(props : TasksItemProps) {
  const { editTask, removeTask, task, toggleTaskDone } = props

  const [editing, setEditing] = useState(false);
  const [newTaskValue, setNewTaskValue] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEdinting() {
    setEditing(true);
  }

  function handleCancelEditing() {
    setNewTaskValue(task.title);
    setEditing(false)
  }

  function handleSubmitEditing() {
    editTask({ taskId: task.id, taskNewTitle: newTaskValue });
    setEditing(false)
  }

  useEffect(() => {
    if(textInputRef.current) {
      if(editing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [editing]);

  return (
    <View style={styles.taskContainer}>
      <View>
        <TouchableOpacity
          testID={`button-${task}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          //TODO - use onPress (toggle task) prop
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            testID={`marker-${task}`}
            //TODO - use style prop
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>
          <TextInput
            ref={textInputRef}
            editable={editing}
            value={newTaskValue}
            onChangeText={setNewTaskValue}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>
      <View>
        {
          editing ? (
            <TouchableOpacity
              onPress={handleCancelEditing}
            >
              <Icon name="X" size={24} color="#b2b2b2"/>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleStartEdinting}
            >
              <Text>0</Text>
            </TouchableOpacity>
          )
        }
        <TouchableOpacity
          disabled={editing}
          onPress={() => removeTask(task.id)}
          style={{opacity: editing ? 0.2 : 1}}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  taskContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-between',
  }
});
