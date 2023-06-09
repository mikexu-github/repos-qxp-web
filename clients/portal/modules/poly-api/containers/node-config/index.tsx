import React, { useEffect, useState, useRef, useCallback } from 'react';
import { isEmpty, omit } from 'ramda';
import { isUndefined } from 'lodash';
import { Input } from '@formily/antd-components';
import { SchemaForm, createFormActions, IFieldState } from '@formily/react-schema-renderer';

import Button from '@c/button';
import Drawer from '@c/drawer';
import store$ from '@polyApi/store';
import EndBody from '@polyApi/nodes/forms/end';
import useObservable from '@lib/hooks/use-observable';
import Condition from '@polyApi/nodes/forms/condition';
import { savePolyApiResult } from '@polyApi/utils/build';
import BodyEditor from '@polyApi/components/body-editor';
import PolyDocDetail from '@polyApi/components/poly-doc-detail';
import ConstantsEditor from '@polyApi/components/constants-editor';
import { NODE_INIT_CONFIG_PARAMS, NODE_TYPE_MAPPER } from '@polyApi/constants';
import toast from '@lib/toast';

import DrawerTitle from './drawer-title';
import PolyDrawerContent from './drawer-content';

import './index.scss';

const schemaFormComponents = {
  input: Input,
  bodyEditor: BodyEditor,
  constantsEditor: ConstantsEditor,
  polyDocDetail: PolyDocDetail,
  condition: Condition,
  endBody: EndBody,
};

const actions = createFormActions();

export default function NodeConfigDrawer(): JSX.Element {
  const store = useObservable(store$);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<{ validate: () => void | never }>();
  const {
    currentNodeConfigParams: { schema, currentNode, onClose, configForm: ConfigForm, excludedFields },
  } = isEmpty(store) ? NODE_INIT_CONFIG_PARAMS : store;
  const nodeData = useObservable(currentNode);
  const [configValue, setConfigValue] = useState<POLY_API.PolyNodeDetail>(nodeData.detail);

  useEffect(() => {
    setConfigValue(nodeData.detail);
    return () => drawerRef.current?.classList.remove('drawer-fullscreen');
  }, [nodeData.detail]);

  const handleOnChange = useCallback((value: Partial<POLY_API.PolyNodeDetail>) => {
    setConfigValue((val) => ({ ...val, ...value }));
  }, [setConfigValue]);

  async function onSave(): Promise<void> {
    try {
      const { errors } = !ConfigForm && schema ? await actions.validate() : { errors: [] };
      const message = errors.map((error) => error.messages.join(',')).join(',');
      if (message) {
        throw new Error(message);
      }
      formRef.current?.validate?.();
      currentNode?.set('detail', omit(excludedFields || [], configValue) );
      savePolyApiResult();
      onCancel();
    } catch (e: any) {
      actions.setFieldState('*', (state: IFieldState) => {
        state.props['x-component-props'] = {
          validating: true,
        };
      });
      if ('errors' in e) {
        toast.error(e.errors[0].messages[0]);
        return;
      }
      toast.error(e);
    }
  }

  function onCancel(): void {
    onClose?.();
    store$.set('currentNodeConfigParams', {
      schema: {},
      configForm: null,
      currentNode: undefined,
      onClose: undefined,
      full: false,
    });
  }

  function onToggleFullscreen(): void {
    drawerRef.current?.classList.toggle('drawer-fullscreen');
    setIsFullScreen(!!drawerRef.current?.classList.contains('drawer-fullscreen'));
  }

  const { title, doc, desc } = NODE_TYPE_MAPPER[nodeData.type] || {};
  const initialValues = nodeData.detail;
  const isValueUndefined = isUndefined(initialValues) || isUndefined(configValue);

  return (
    <Drawer
      ref={drawerRef}
      position="right"
      className="node-config-drawer"
      title={(
        <DrawerTitle
          title={title}
          desc={desc}
          doc={doc}
          onToggleFullscreen={onToggleFullscreen}
          isFullScreen={isFullScreen}
        />
      )}
      onCancel={onCancel}
      visible={!!((schema || ConfigForm) && currentNode)}
      content={PolyDrawerContent}
    >
      <section className="node-config-form-section">
        {ConfigForm && !isValueUndefined && (
          <ConfigForm
            initialValues={initialValues}
            value={configValue}
            onChange={handleOnChange}
            ref={formRef}
          />
        )}
        {!ConfigForm && !isValueUndefined && !isEmpty(schema) && (
          <SchemaForm
            schema={schema}
            initialValues={initialValues}
            value={configValue}
            actions={actions}
            onChange={handleOnChange}
            components={schemaFormComponents}
          />
        )}
      </section>
      <div
        className="bg-gray-50 text-right px-20 py-8 border-t-1 border-gray-200 flex justify-end
        content-center items-center"
      >
        <Button iconSize={14} className="mr-12 h-28" iconName="close" onClick={onCancel}>取消</Button>
        <Button
          iconSize={14}
          className="h-28"
          modifier="primary"
          iconName="save"
          onClick={onSave}
        >
          保存
        </Button>
      </div>
    </Drawer>
  );
}
