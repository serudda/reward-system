import cn from 'classnames';
import { Button, ButtonSize, ButtonVariant, Icon, IconCatalog } from '~/components';

export interface ConnectAccountCardProps {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;

  /**
   * The icon to display
   */
  icon: IconCatalog;

  /**
   * Set the item name
   */
  title: string;

  /**
   * Set the text to display when the account is not connected
   */
  disconnectedText?: string;

  /**
   * Set the text to display when the account is connected
   */
  connectedText?: string;

  /**
   * Set if the account is connected
   */
  isConnected?: boolean;

  /**
   * Provide a handler that is called when the connect button was clicked.
   */
  onConnectClick?: () => void;
}

/**
 * Represents a Connect Account Card
 */
export const ConnectAccountCard = ({
  className,
  icon,
  title,
  connectedText,
  disconnectedText,
  isConnected = false,
}: ConnectAccountCardProps) => {
  const classes = cn('flex flex-col justify-between space-y-6 rounded-lg border p-6', className, {
    'border-slate-800': isConnected,
    'border-slate-600': !isConnected,
  });

  /* Render JSX */
  return (
    <div className={classes}>
      <div className="flex h-8 items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon className="h-8 w-8 text-slate-50" icon={icon} isSolid />
          <p className="text-xl font-semibold">{title}</p>
        </div>
        {isConnected ? (
          <Button variant={ButtonVariant.destructive} endIcon={IconCatalog.trash} size={ButtonSize.xs} />
        ) : (
          <Button variant={ButtonVariant.primary} size={ButtonSize.sm}>
            Connect
          </Button>
        )}
      </div>
      {isConnected ? (
        <div className="flex items-center space-x-3">
          <Icon className="h-6 w-6 text-green-500" icon={IconCatalog.checkCircle} />
          <p className="font-medium leading-relaxed">{connectedText}</p>
        </div>
      ) : (
        <p className="font-medium leading-relaxed text-slate-500">{disconnectedText}</p>
      )}
    </div>
  );
};
