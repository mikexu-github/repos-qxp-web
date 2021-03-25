/**
 * 组件-部门人员
 */
import React from 'react';

interface DepartmentStaffProps {
  department: string;
  count?: number;
  unit?: string;
}

export const DepartmentStaff = ({ department, count = 0, unit }: DepartmentStaffProps) => {
  return (
    <div className="h-3-dot-8 pl-8 flex items-center">
      <div className="h-full leading-3-dot-8 text-1-dot-4
      text-black-900 font-semibold">{department}</div>
      {unit && (
        <div className="h-full leading-3-dot-8 text-1-dot-2 text-gray-400">
          （{count} {unit}）
        </div>
      )}
    </div>
  );
};
