
import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface CustomTabsProps {
  items: TabItem[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: 'underline' | 'pills' | 'boxes';
  className?: string;
  tabsListClassName?: string;
  orientation?: 'horizontal' | 'vertical';
}

const CustomTabs = ({
  items,
  defaultValue,
  onChange,
  variant = 'underline',
  className,
  tabsListClassName,
  orientation = 'horizontal',
}: CustomTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultValue || (items[0]?.id || ''));
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultValue) {
      setActiveTab(defaultValue);
    }
  }, [defaultValue]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (onChange) {
      onChange(value);
    }
  };

  // Styles pour les différentes variantes
  const getTabTriggerStyles = () => {
    switch (variant) {
      case 'underline':
        return "data-[state=active]:border-b-2 data-[state=active]:border-agri-green data-[state=active]:bg-transparent rounded-none py-3";
      case 'pills':
        return "data-[state=active]:bg-agri-green data-[state=active]:text-white rounded-full";
      case 'boxes':
        return "data-[state=active]:bg-agri-green/10 data-[state=active]:text-agri-green-dark data-[state=active]:border-agri-green border rounded-md";
      default:
        return "data-[state=active]:border-b-2 data-[state=active]:border-agri-green data-[state=active]:bg-transparent";
    }
  };

  const tabsListStyles = cn(
    "bg-transparent",
    orientation === 'vertical' ? "flex-col space-x-0 space-y-1" : "space-x-1",
    variant === 'underline' ? "border-b border-gray-200" : "",
    tabsListClassName
  );

  return (
    <div ref={tabsContainerRef} className={cn("w-full", className)}>
      <Tabs
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={handleTabChange}
        className={cn("w-full", orientation === 'vertical' ? "flex" : "")}
      >
        <TabsList className={tabsListStyles}>
          {items.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className={cn("text-base transition-all", getTabTriggerStyles())}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CustomTabs;
