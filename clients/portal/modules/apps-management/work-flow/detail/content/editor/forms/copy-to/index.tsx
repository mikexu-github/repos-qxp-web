import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import formFieldWrap from '@c/form-field-wrap';
import SaveButtonGroup from '@flowEditor/components/_common/action-save-button-group';

import UserSelect from '../../components/add-approval-user';

const Input = formFieldWrap({ field: <input className='input' /> });
const FieldUserSelect = formFieldWrap({ FieldFC: UserSelect });

type Props = {
  defaultValue: Record<string, any>;
  onSubmit: (v: any) => void;
  onCancel: () => void;
}

function CopyTo({ defaultValue, onSubmit }: Props): JSX.Element {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm();

  useEffect(() => {
    reset(defaultValue);
  }, []);

  const handleSave = (data: Record<string, any>): void => {
    onSubmit(data);
  };

  const handleCancel = (): void => {
    return;
  };

  return (
    <div>
      <Input
        label={<><span className='text-red-600'>*</span>步骤名称</>}
        placeholder='请输入'
        defaultValue={defaultValue.name}
        error={errors.name}
        register={register('name', { required: '请输入步骤名称' })}
      />
      <Controller
        name='recivers'
        control={control}
        rules={{ required: '请选择接收对象' }}
        render={({ field }) => {
          return (
            <FieldUserSelect
              label={<><span className='text-red-600'>*</span>接收对象</>}
              error={errors.recivers}
              register={field}
              value={field.value ? field.value : []}
            />
          );
        }
        }
      />
      <SaveButtonGroup onCancel={handleCancel} onSave={handleSubmit(handleSave)} />
    </div>
  );
}

export default CopyTo;