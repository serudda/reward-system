import cn from 'classnames';

import { ItemsCard } from '~/components/ItemsCard/ItemsCard';

export interface ItemsGridProps {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;
}

/**
 * Represents the Items Grid section
 */
export const ItemsGrid = ({ className }: ItemsGridProps) => {
  const classes = {
    container: cn(className, 'e-flex e-items-center'),
  };

  /* Render JSX */
  return (
    <div className={classes.container}>
      <div className="w-full rounded-lg border border-slate-800 bg-slate-800/30">
        {/* Header */}
        <div className="border-b border-slate-800 p-5">
          <div className="text-lg text-slate-700">Search item</div>
        </div>

        {/* Body */}
        <div className="p-8">
          <div className="mb-3 font-semibold text-slate-500">All Items</div>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Item Card */}
            <ItemsCard
              thumbnailUrl="https://yt3.googleusercontent.com/rwU607PYF9jK9QL2I85SdfCLVZJGGsxWukuF_LxD0PepnqEIrFVg3W85FOVPDmWdMN1SxyJ7Xi8=s900-c-k-c0x00ffffff-no-rj"
              title="Suscripcion a Platzi"
              cost={43000}
              amountAvailable={0}
              isDisabled
            />
            <ItemsCard
              thumbnailUrl="https://yt3.googleusercontent.com/rwU607PYF9jK9QL2I85SdfCLVZJGGsxWukuF_LxD0PepnqEIrFVg3W85FOVPDmWdMN1SxyJ7Xi8=s900-c-k-c0x00ffffff-no-rj"
              title="Suscripcion a Platzi"
              cost={43000}
              amountAvailable={2}
            />
            <ItemsCard
              thumbnailUrl="https://yt3.googleusercontent.com/rwU607PYF9jK9QL2I85SdfCLVZJGGsxWukuF_LxD0PepnqEIrFVg3W85FOVPDmWdMN1SxyJ7Xi8=s900-c-k-c0x00ffffff-no-rj"
              title="Suscripcion a Platzi"
              cost={43000}
              amountAvailable={20}
            />
            <ItemsCard
              thumbnailUrl="https://yt3.googleusercontent.com/rwU607PYF9jK9QL2I85SdfCLVZJGGsxWukuF_LxD0PepnqEIrFVg3W85FOVPDmWdMN1SxyJ7Xi8=s900-c-k-c0x00ffffff-no-rj"
              title="Suscripcion a Platzi"
              cost={43000}
              amountAvailable={1}
            />
            <ItemsCard
              thumbnailUrl="https://yt3.googleusercontent.com/rwU607PYF9jK9QL2I85SdfCLVZJGGsxWukuF_LxD0PepnqEIrFVg3W85FOVPDmWdMN1SxyJ7Xi8=s900-c-k-c0x00ffffff-no-rj"
              title="Suscripcion a Platzi"
              cost={43000}
              amountAvailable={20}
            />
            <ItemsCard
              thumbnailUrl="https://yt3.googleusercontent.com/rwU607PYF9jK9QL2I85SdfCLVZJGGsxWukuF_LxD0PepnqEIrFVg3W85FOVPDmWdMN1SxyJ7Xi8=s900-c-k-c0x00ffffff-no-rj"
              title="Suscripcion a Platzi"
              cost={43000}
              amountAvailable={20}
            />
            <ItemsCard
              thumbnailUrl="https://yt3.googleusercontent.com/rwU607PYF9jK9QL2I85SdfCLVZJGGsxWukuF_LxD0PepnqEIrFVg3W85FOVPDmWdMN1SxyJ7Xi8=s900-c-k-c0x00ffffff-no-rj"
              title="Suscripcion a Platzi"
              cost={43000}
              amountAvailable={20}
            />
            <ItemsCard
              thumbnailUrl="https://yt3.googleusercontent.com/rwU607PYF9jK9QL2I85SdfCLVZJGGsxWukuF_LxD0PepnqEIrFVg3W85FOVPDmWdMN1SxyJ7Xi8=s900-c-k-c0x00ffffff-no-rj"
              title="Suscripcion a Platzi"
              cost={43000}
              amountAvailable={20}
            />
          </div>
        </div>

        {/* Footer */}
      </div>
    </div>
  );
};
