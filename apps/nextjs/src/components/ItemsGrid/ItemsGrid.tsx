import Image from 'next/image';
import cn from 'classnames';

import { Tag, TagVariant } from '~/components/Tag/Tag';

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
            <div className="">
              <div className="mb-2 flex flex-col">
                {/* Image */}
                <div className="relative flex items-center justify-center rounded-t-lg bg-slate-800 p-6">
                  <div className="absolute top-2 right-2">
                    <Tag variant={TagVariant.neutral}>🔥</Tag>
                  </div>

                  <div className="rounded-full">
                    <Image
                      className="rounded-full"
                      src="https://yt3.googleusercontent.com/rwU607PYF9jK9QL2I85SdfCLVZJGGsxWukuF_LxD0PepnqEIrFVg3W85FOVPDmWdMN1SxyJ7Xi8=s900-c-k-c0x00ffffff-no-rj"
                      alt="Platzi"
                      width={140}
                      height={140}
                    />
                  </div>
                </div>

                {/* Action */}
                <div className="bg-primary-200/20 text-primary-50 hover:bg-primary-200/30 flex cursor-pointer items-center justify-center rounded-b-lg p-2">
                  <div className="flex items-center space-x-2">
                    <Image src="/assets/indie-token-icon.png" alt="Platzi" width={20} height={20} />
                    <span className="font-bold">50.000</span>
                  </div>
                </div>
              </div>

              {/* Item info */}
              <div className="">
                <p className="mb-1 text-lg font-semibold text-slate-300 line-clamp-2">
                  Suscripción de Curso de Platzi por un mes Suscripción de Curso de Platzi por un mes
                </p>
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-semibold text-slate-500">Amount</div>
                  <Tag variant={TagVariant.error}>last unit</Tag>
                </div>
              </div>
            </div>

            {/* Item Card */}
            <div className="">
              <div className="mb-2 flex flex-col">
                {/* Image */}
                <div className="relative flex items-center justify-center rounded-t-lg bg-slate-800 p-6">
                  <div className="absolute top-2 right-2">
                    <Tag variant={TagVariant.neutral}>🔥</Tag>
                  </div>

                  <div className="rounded-full">
                    <Image
                      className="rounded-full"
                      src="https://yt3.googleusercontent.com/rwU607PYF9jK9QL2I85SdfCLVZJGGsxWukuF_LxD0PepnqEIrFVg3W85FOVPDmWdMN1SxyJ7Xi8=s900-c-k-c0x00ffffff-no-rj"
                      alt="Platzi"
                      width={140}
                      height={140}
                    />
                  </div>
                </div>

                {/* Action */}
                <div className="bg-primary-200/20 text-primary-50 hover:bg-primary-200/30 flex cursor-pointer items-center justify-center rounded-b-lg p-2">
                  <div className="flex items-center space-x-2">
                    <Image src="/assets/indie-token-icon.png" alt="Platzi" width={20} height={20} />
                    <span className="font-bold">50.000</span>
                  </div>
                </div>
              </div>

              {/* Item info */}
              <div className="">
                <p className="mb-1 text-lg font-semibold text-slate-300 line-clamp-2">
                  Suscripción de Curso de Platzi por un mes
                </p>
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-semibold text-slate-500">Amount</div>
                  <Tag variant={TagVariant.error}>last unit</Tag>
                </div>
              </div>
            </div>

            {/* Item Card */}
            <div className="">
              <div className="mb-2 flex flex-col">
                {/* Image */}
                <div className="relative flex items-center justify-center rounded-t-lg bg-slate-800 p-6">
                  <div className="absolute top-2 right-2">
                    <Tag variant={TagVariant.neutral}>🔥</Tag>
                  </div>

                  <div className="rounded-full">
                    <Image
                      className="rounded-full"
                      src="https://yt3.googleusercontent.com/rwU607PYF9jK9QL2I85SdfCLVZJGGsxWukuF_LxD0PepnqEIrFVg3W85FOVPDmWdMN1SxyJ7Xi8=s900-c-k-c0x00ffffff-no-rj"
                      alt="Platzi"
                      width={140}
                      height={140}
                    />
                  </div>
                </div>

                {/* Action */}
                <div className="bg-primary-200/20 text-primary-50 hover:bg-primary-200/30 flex cursor-pointer items-center justify-center rounded-b-lg p-2">
                  <div className="flex items-center space-x-2">
                    <Image src="/assets/indie-token-icon.png" alt="Platzi" width={20} height={20} />
                    <span className="font-bold">50.000</span>
                  </div>
                </div>
              </div>

              {/* Item info */}
              <div className="">
                <p className="mb-1 text-lg font-semibold text-slate-300 line-clamp-2">
                  Suscripción de Curso de Platzi por un mes
                </p>
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-semibold text-slate-500">Amount</div>
                  <Tag variant={TagVariant.error}>last unit</Tag>
                </div>
              </div>
            </div>

            {/* Item Card */}
            <div className="">
              <div className="mb-2 flex flex-col">
                {/* Image */}
                <div className="relative flex items-center justify-center rounded-t-lg bg-slate-800 p-6">
                  <div className="absolute top-2 right-2">
                    <Tag variant={TagVariant.neutral}>🔥</Tag>
                  </div>

                  <div className="rounded-full">
                    <Image
                      className="rounded-full"
                      src="https://yt3.googleusercontent.com/rwU607PYF9jK9QL2I85SdfCLVZJGGsxWukuF_LxD0PepnqEIrFVg3W85FOVPDmWdMN1SxyJ7Xi8=s900-c-k-c0x00ffffff-no-rj"
                      alt="Platzi"
                      width={140}
                      height={140}
                    />
                  </div>
                </div>

                {/* Action */}
                <div className="bg-primary-200/20 text-primary-50 hover:bg-primary-200/30 flex cursor-pointer items-center justify-center rounded-b-lg p-2">
                  <div className="flex items-center space-x-2">
                    <Image src="/assets/indie-token-icon.png" alt="Platzi" width={20} height={20} />
                    <span className="font-bold">50.000</span>
                  </div>
                </div>
              </div>

              {/* Item info */}
              <div className="">
                <p className="mb-1 text-lg font-semibold text-slate-300 line-clamp-2">
                  Suscripción de Curso de Platzi por un mes
                </p>
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-semibold text-slate-500">Amount</div>
                  <Tag variant={TagVariant.error}>last unit</Tag>
                </div>
              </div>
            </div>

            {/* Item Card */}
            <div className="">
              <div className="mb-2 flex flex-col">
                {/* Image */}
                <div className="relative flex items-center justify-center rounded-t-lg bg-slate-800 p-6">
                  <div className="absolute top-2 right-2">
                    <Tag variant={TagVariant.neutral}>🔥</Tag>
                  </div>

                  <div className="rounded-full">
                    <Image
                      className="rounded-full"
                      src="https://yt3.googleusercontent.com/rwU607PYF9jK9QL2I85SdfCLVZJGGsxWukuF_LxD0PepnqEIrFVg3W85FOVPDmWdMN1SxyJ7Xi8=s900-c-k-c0x00ffffff-no-rj"
                      alt="Platzi"
                      width={140}
                      height={140}
                    />
                  </div>
                </div>

                {/* Action */}
                <div className="bg-primary-200/20 text-primary-50 hover:bg-primary-200/30 flex cursor-pointer items-center justify-center rounded-b-lg p-2">
                  <div className="flex items-center space-x-2">
                    <Image src="/assets/indie-token-icon.png" alt="Platzi" width={20} height={20} />
                    <span className="font-bold">50.000</span>
                  </div>
                </div>
              </div>

              {/* Item info */}
              <div className="">
                <p className="mb-1 text-lg font-semibold text-slate-300 line-clamp-2">
                  Suscripción de Curso de Platzi por un mes
                </p>
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-semibold text-slate-500">Amount</div>
                  <Tag variant={TagVariant.error}>last unit</Tag>
                </div>
              </div>
            </div>

            {/* Item Card */}
            <div className="">
              <div className="mb-2 flex flex-col">
                {/* Image */}
                <div className="relative flex items-center justify-center rounded-t-lg bg-slate-800 p-6">
                  <div className="absolute top-2 right-2">
                    <Tag variant={TagVariant.neutral}>🔥</Tag>
                  </div>

                  <div className="rounded-full">
                    <Image
                      className="rounded-full"
                      src="https://yt3.googleusercontent.com/rwU607PYF9jK9QL2I85SdfCLVZJGGsxWukuF_LxD0PepnqEIrFVg3W85FOVPDmWdMN1SxyJ7Xi8=s900-c-k-c0x00ffffff-no-rj"
                      alt="Platzi"
                      width={140}
                      height={140}
                    />
                  </div>
                </div>

                {/* Action */}
                <div className="bg-primary-200/20 text-primary-50 hover:bg-primary-200/30 flex cursor-pointer items-center justify-center rounded-b-lg p-2">
                  <div className="flex items-center space-x-2">
                    <Image src="/assets/indie-token-icon.png" alt="Platzi" width={20} height={20} />
                    <span className="font-bold">50.000</span>
                  </div>
                </div>
              </div>

              {/* Item info */}
              <div className="">
                <p className="mb-1 text-lg font-semibold text-slate-300 line-clamp-2">
                  Suscripción de Curso de Platzi por un mes
                </p>
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-semibold text-slate-500">Amount</div>
                  <Tag variant={TagVariant.error}>last unit</Tag>
                </div>
              </div>
            </div>

            {/* Item Card */}
            <div className="">
              <div className="mb-2 flex flex-col">
                {/* Image */}
                <div className="relative flex items-center justify-center rounded-t-lg bg-slate-800 p-6">
                  <div className="absolute top-2 right-2">
                    <Tag variant={TagVariant.neutral}>🔥</Tag>
                  </div>

                  <div className="rounded-full">
                    <Image
                      className="rounded-full"
                      src="https://yt3.googleusercontent.com/rwU607PYF9jK9QL2I85SdfCLVZJGGsxWukuF_LxD0PepnqEIrFVg3W85FOVPDmWdMN1SxyJ7Xi8=s900-c-k-c0x00ffffff-no-rj"
                      alt="Platzi"
                      width={140}
                      height={140}
                    />
                  </div>
                </div>

                {/* Action */}
                <div className="bg-primary-200/20 text-primary-50 hover:bg-primary-200/30 flex cursor-pointer items-center justify-center rounded-b-lg p-2">
                  <div className="flex items-center space-x-2">
                    <Image src="/assets/indie-token-icon.png" alt="Platzi" width={20} height={20} />
                    <span className="font-bold">50.000</span>
                  </div>
                </div>
              </div>

              {/* Item info */}
              <div className="">
                <p className="mb-1 text-lg font-semibold text-slate-300 line-clamp-2">
                  Suscripción de Curso de Platzi por un mes
                </p>
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-semibold text-slate-500">Amount</div>
                  <Tag variant={TagVariant.error}>last unit</Tag>
                </div>
              </div>
            </div>

            {/* Item Card */}
            <div className="">
              <div className="mb-2 flex flex-col">
                {/* Image */}
                <div className="relative flex items-center justify-center rounded-t-lg bg-slate-800 p-6">
                  <div className="absolute top-2 right-2">
                    <Tag variant={TagVariant.neutral}>🔥</Tag>
                  </div>

                  <div className="rounded-full">
                    <Image
                      className="rounded-full"
                      src="https://yt3.googleusercontent.com/rwU607PYF9jK9QL2I85SdfCLVZJGGsxWukuF_LxD0PepnqEIrFVg3W85FOVPDmWdMN1SxyJ7Xi8=s900-c-k-c0x00ffffff-no-rj"
                      alt="Platzi"
                      width={140}
                      height={140}
                    />
                  </div>
                </div>

                {/* Action */}
                <div className="bg-primary-200/20 text-primary-50 hover:bg-primary-200/30 flex cursor-pointer items-center justify-center rounded-b-lg p-2">
                  <div className="flex items-center space-x-2">
                    <Image src="/assets/indie-token-icon.png" alt="Platzi" width={20} height={20} />
                    <span className="font-bold">50.000</span>
                  </div>
                </div>
              </div>

              {/* Item info */}
              <div className="">
                <p className="mb-1 text-lg font-semibold text-slate-300 line-clamp-2">
                  Suscripción de Curso de Platzi por un mes
                </p>
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-semibold text-slate-500">Amount</div>
                  <Tag variant={TagVariant.error}>last unit</Tag>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
      </div>
    </div>
  );
};
