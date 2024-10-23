import { motion } from 'framer-motion';
import { useDelayedVisibility } from '../../hooks/useDelayedVisibility';

interface ToolSidebarHeaderProps {
  title: string;
  description?: string;
}

const ToolSidebarHeader = ({ title, description }: ToolSidebarHeaderProps) => {
  const isVisible = useDelayedVisibility(300);

  return (
    <div className="p-4 border-b space-y-1 h-[68px]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-sm font-semibold">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </motion.div>
    </div>
  );
};

export default ToolSidebarHeader;
