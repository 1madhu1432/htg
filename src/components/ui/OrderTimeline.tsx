import React from 'react';
import { OrderTimelineStep } from '../../types';
import { CheckCircle, Circle, Clock } from 'lucide-react';

interface OrderTimelineProps {
  steps: OrderTimelineStep[];
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ steps }) => {
  return (
    <div className="py-4">
      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        {/* Horizontal Connector Line for Desktop */}
        <div className="hidden md:block absolute top-1/2 left-4 right-4 h-1 bg-slate-200 -translate-y-1/2 z-0" />

        {steps.map((step, index) => {
          const isCompleted = step.completed;
          const isCurrent = step.current;

          return (
            <div key={index} className="relative z-10 flex md:flex-col items-center gap-3 md:gap-2 text-left md:text-center w-full md:w-auto">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-md ${
                  isCompleted
                    ? 'bg-emerald-600 text-white shadow-emerald-200'
                    : isCurrent
                    ? 'bg-sky-600 text-white ring-4 ring-sky-100 shadow-sky-200 animate-pulse'
                    : 'bg-white text-slate-400 border-2 border-slate-200'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : isCurrent ? (
                  <Clock className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className={`text-xs font-bold ${isCurrent ? 'text-sky-700' : isCompleted ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {step.title}
                </p>
                {step.date && <p className="text-[11px] text-slate-400 mt-0.5">{step.date}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
