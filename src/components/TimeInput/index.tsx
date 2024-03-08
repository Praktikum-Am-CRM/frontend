import styles from './styles.module.css';
import { Text, TextInput } from '@gravity-ui/uikit';
import { timeSchema } from '../../utils/validationSchema';
import { useState } from 'react';
import { Time } from '../NewMailing';

type TimeInputProps = {
  time: Time;
  setTime: (time: Time) => void;
};

const TimeInput: React.FC<TimeInputProps> = ({ time, setTime }) => {
  const [hourError, setHourError] = useState('');
  const [minuteError, setMinuteError] = useState('');

  const error = hourError || minuteError;

  const handleTimeChange = (part: 'hours' | 'minutes', newValue: string) => {
    const valueAsNumber = newValue === '' ? 0 : parseInt(newValue, 10);

    if (newValue.length > 0) {
      timeSchema
        .validateAt(part, { [part]: valueAsNumber })
        .then(() => {
          const newTime = {
            ...time,
            [part]: newValue === '' ? '' : valueAsNumber,
          };
          setTime(newTime);
          if (part === 'hours') {
            setHourError('');
          } else {
            setMinuteError('');
          }
        })
        .catch(error => {
          if (part === 'hours') {
            setHourError(error.message);
          } else {
            setMinuteError(error.message);
          }
        });
    } else {
      const newTime = {
        ...time,
        [part]: '',
      };
      setTime(newTime);
      if (part === 'hours') {
        setHourError('');
      } else {
        setMinuteError('');
      }
    }
  };

  const formatInputValue = (part: 'hours' | 'minutes') => {
    const value = time[part];
    return value.toString();
  };

  return (
    <div className={styles.root}>
      <div className={styles.inputs}>
        <TextInput
          type="text"
          value={formatInputValue('hours')}
          onChange={e => handleTimeChange('hours', e.target.value)}
        />
        <span>:</span>
        <TextInput
          type="text"
          value={formatInputValue('minutes')}
          onChange={e => handleTimeChange('minutes', e.target.value)}
        />
      </div>
      {error && (
        <Text className={styles.error} color="danger">
          Введите время в формате 23:59
        </Text>
      )}
    </div>
  );
};

export default TimeInput;
