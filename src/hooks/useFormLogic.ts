import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../utils/validationSchema';
import { ILoginForm } from '../types/types';

export function useFormLogic() {
  return useForm<ILoginForm>({
    resolver: yupResolver(loginSchema),
  });
}
