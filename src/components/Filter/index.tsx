import {
  Button,
  Checkbox,
  Icon,
  Popup,
  RadioGroup,
  Text,
} from '@gravity-ui/uikit';
import { useRef, useState } from 'react';
import VerticalSlidersIcon from '../../assets/images/VerticalSlidersIcon';

import styles from './styles.module.css';

export default function Filter() {
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const genderOptions = [
    { value: 'men', content: 'Мужчины' },
    { value: 'women', content: 'Женщины' },
  ];

  const amStatusOptions = [
    { value: 'active', content: 'Активный' },
    { value: 'pending', content: 'Уточняется' },
    { value: 'paused', content: 'На паузе' },
    { value: 'notamb', content: 'Не амбассадор' },
  ];

  const FilterText = ({ children }: { children: string }) => (
    <Text variant="body-1" color="secondary">
      {children}
    </Text>
  );

  return (
    <>
      <Button size="xl" ref={buttonRef} onClick={handleClick}>
        <Icon data={VerticalSlidersIcon} size={18} />
      </Button>
      <Popup
        anchorRef={buttonRef}
        open={open}
        placement="bottom"
        onOutsideClick={handleClick}
      >
        <div className={styles.filters}>
          <div className={styles.filters__container}>
            <FilterText>Статус</FilterText>
            <ul className={styles.filters__checkboxList}>
              {amStatusOptions.map(({ value, content }) => (
                <li key={value} className={styles.filters__checkboxItem}>
                  <Checkbox value={value} content={content} />
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.filters__container}>
            <FilterText>Пол</FilterText>
            <RadioGroup
              name="genderRadioGroup"
              defaultValue={genderOptions[0].value}
              options={genderOptions}
              direction="vertical"
            />
          </div>
        </div>
      </Popup>
    </>
  );
}
