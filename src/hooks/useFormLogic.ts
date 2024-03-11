import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, timeSchema } from '../utils/validationSchema';

export function useFormLogic() {
  return useForm<ILoginForm>({
    resolver: yupResolver(loginSchema),
  });
}

export function useTimeForm() {
  return useForm({
    resolver: yupResolver(timeSchema),
  });
}
