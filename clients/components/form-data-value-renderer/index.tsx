import React, { Suspense } from 'react';
import moment from 'moment';

import logger from '@lib/logger';
import AssociatedDataValueRender from '@c/form-builder/registry/associated-data/associated-data-view';
import { RoundMethod } from '@c/form-builder/registry/aggregation-records/convertor';
import { FileList } from '@c/file-upload';
import { QxpFileFormData } from '@c/form-builder/registry/file-upload/uploader';

const ReadOnlySubTable = React.lazy(
  () => import('@c/form-builder/registry/sub-table/preview/read-only-sub-table'),
);
const AssociatedRecords = React.lazy(
  () => import('@c/form-builder/registry/associated-records/associated-records'),
);

type ValueRendererProps = { value: FormDataValue; schema: ISchema; className?: string; };
type Props = {
  value: FormDataValue;
  className?: string;
  schema: ISchema;
}

function datetimeValueRenderer({ value, schema }: ValueRendererProps): string {
  const format = schema['x-component-props']?.format || 'YYYY-MM-DD HH:mm:ss';

  return value ? moment(value as string).format(format) : '';
}

function SubTableValueRenderer({ value, schema, className }: ValueRendererProps): JSX.Element {
  return (
    <Suspense fallback={<div>loading...</div>} >
      <ReadOnlySubTable
        className={className}
        value={value as Record<string, unknown>[]}
        schema={schema as any}
      />
    </Suspense>
  );
}

function AssociatedRecordsValueRender({ value, schema, className }: ValueRendererProps): JSX.Element {
  return (
    <Suspense fallback={<div>loading...</div>} >
      <AssociatedRecords
        props={{ readOnly: true, ['x-component-props']: schema?.['x-component-props'], className }}
        value={value}
      />
    </Suspense>
  );
}

function numberPickerValueRender({ schema, value }: ValueRendererProps): string {
  return Number(value).toFixed(schema?.['x-component-props']?.precision || 0);
}

export function labelValueRenderer(value: FormDataValue): string {
  if (Array.isArray(value)) {
    const labels = (value as FormBuilder.Option[]).map(({ label }) => label).join(', ');
    return labels;
  }

  return (value as FormBuilder.Option)?.label;
}

function statisticValueRender({ schema, value }: ValueRendererProps): string {
  const { decimalPlaces, roundDecimal, displayFieldNull } = schema['x-component-props'] as {
    decimalPlaces: number, roundDecimal: RoundMethod, displayFieldNull: string
  };
  let method = Math.round;
  if (roundDecimal === 'round-up') {
    method = Math.ceil;
  } else if (roundDecimal === 'round-down') {
    method = Math.floor;
  }
  return method(parseFloat(value as string)).toFixed(decimalPlaces) + '' || displayFieldNull;
}

function stringListValue({ value }: ValueRendererProps): string {
  if (!Array.isArray(value)) {
    return '';
  }

  return value.join(', ');
}

export default function FormDataValueRenderer({ value, schema, className }: Props): JSX.Element {
  switch (schema['x-component']) {
  case 'SubTable':
    return (<SubTableValueRenderer schema={schema} value={value} />);
  case 'AssociatedRecords':
    return (<AssociatedRecordsValueRender schema={schema} value={value} />);
  case 'AssociatedData':
    return (<AssociatedDataValueRender schema={schema} value={value as LabelValue} />);
  case 'ImageUpload': {
    return (
      <div className="flex flex-wrap">
        <FileList
          canDownload
          imgOnly={true}
          files={(value as QxpFileFormData[]).map((file) =>
            ({
              name: file.label,
              uid: file.value,
              type: file.type,
              size: file.size,
            }),
          )}
        />
      </div>

    );
  }
  case 'FileUpload': {
    return (
      <div className="max-w-290">
        <FileList
          canDownload
          files={(value as QxpFileFormData[]).map((file) =>
            ({
              name: file.label,
              uid: file.value,
              type: file.type,
              size: file.size,
            }),
          )}
        />
      </div>
    );
  }
  default: {
    const content = getBasicValue(schema, value);
    return (
      <span title={typeof content === 'string' ? content : ''} className={className}>{content}</span>
    );
  }
  }
}

export function getBasicValue(schema: ISchema, value: FormDataValue): string {
  switch (schema['x-component']?.toLowerCase()) {
  case 'input':
  case 'textarea':
  case 'radiogroup':
  case 'select':
  case 'serial':
    return value as string;
  case 'numberpicker':
    return numberPickerValueRender({ schema, value });
  case 'checkboxgroup':
  case 'multipleselect':
    return stringListValue({ schema, value });
  case 'datepicker':
    return datetimeValueRenderer({ schema, value });
  case 'associateddata':
  case 'cascadeselector':
  case 'userpicker':
  case 'organizationpicker':
    return labelValueRenderer(value);
  case 'aggregationrecords':
    return statisticValueRender({ schema, value });
  default:
    logger.warn('encounter unsupported formDataValue:', value, 'schema:', schema);
    return value?.toString();
  }
}
