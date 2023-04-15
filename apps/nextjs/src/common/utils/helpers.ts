import type { CSSProperties } from 'react';

/**
 * isNullOrUndefined
 * @description - validate if an element is null or undefined
 * @function
 * @param {any} value - Element to validate
 * @return {boolean} Element is null or undefined.
 */
export const isNullOrUndefined = (value: any): boolean => value === undefined || value === null;

/**
 * includeTerm
 * @description - validate if an term text is included into a text
 * @function
 * @param {string} term - some chars to be checked into the text
 * @param {string} text - the text to be checked by the term
 * @return {boolean} Term is included within the text
 */
export const includeTerm = (term: string, text: string) => text.toLowerCase().includes(term.toLocaleLowerCase());

/**
 * hasProp
 * @description - validate if an object has the prop passed arg
 * @function
 * @param {any} obj - Object to validate
 * @param {string} prop - prop's key to check if it belongs to the obj
 * @return {boolean} The obj does has the prop.
 */
export const hasProp = (obj = {}, prop: string): boolean => {
  if (obj === null || typeof obj !== 'object') return false;
  return prop in obj;
};

/**
 * setMaxHeightByOptions
 * @description - Set the max height by a list of options
 * @param {SetMaxHeightByOptions} options - the list length, the max amount of options, and max height
 * @returns {CSSProperties}
 */
interface SetMaxHeightByOptions {
  listLength: number;
  maxOptions: number;
  maxHeight: string;
}
export const setMaxHeightByOptions = (options: SetMaxHeightByOptions): CSSProperties => {
  const { listLength, maxOptions, maxHeight } = options;
  const calcHeight = listLength <= maxOptions ? 'auto' : maxHeight;
  return { height: calcHeight };
};

/**
 * formatBytes
 * @description - parse bytes to KB, MB, GB, etc
 * @function
 * @param {number} bytes - bytes to parse
 * @param {number} decimals - decimals (0) or binary (2) form
 * @return {string} Returns the bytes parsed.
 */
export const formatBytes = (bytes = 0, decimals = 0): string => {
  if (bytes === 0) return '0 Bytes';
  const kb = 1024;
  const parsedDecimal = decimals <= 0 ? 0 : decimals || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const index = Math.floor(Math.log(bytes) / Math.log(kb));
  return `${parseFloat((bytes / Math.pow(kb, index)).toFixed(parsedDecimal))} ${sizes[index]}`;
};

/**
 * getExtensionFile
 * @description - Get the file's extension
 * @param {string} fileName the file name
 * @returns {string} the extension
 */
export const getExtensionFile = (fileName = ''): string => {
  return fileName.split('.').pop() as string;
};

/**
 * toMb
 * @description - parse a number into the megabyte format
 * @function
 * @param {number} bytes - bytes to parse
 * @return {number} Returns the megabyte representation.
 */
export const toMb = (bytes: number): number => {
  return bytes / 1024 / 1024;
};

/**
 * This function is a wrapper to promisify the native callback on the GET File Request
 * @param {FileSystemFileEntry} item
 * @returns File
 */
const getFileAsync = (item: FileSystemFileEntry) => {
  return new Promise<File>((resolve, reject) => {
    item.file(
      (file) => {
        resolve(file);
      },
      (err) => {
        reject(err);
      },
    );
  });
};

/**
 * This function is a wrapper to promisify the native callback on the Read Entries Request
 * @param {FileSystemDirectoryReader} reader
 * @returns File
 */
const readEntriesAsync = (reader: FileSystemDirectoryReader) => {
  return new Promise<FileSystemEntry[]>((resolve, reject) => {
    reader.readEntries(
      (entries) => {
        resolve(entries);
      },
      (err) => {
        reject(err);
      },
    );
  });
};

/**
 * recursiveTreeFollow
 * @description Recursive Function
 * @param {FileSystemEntry} item Directory or file
 * @param {string} path parent path
 */
const recursiveTreeFollow = async (item: FileSystemEntry, path = ''): Promise<Array<File>> => {
  // check if item is a file or a directory
  if (item.isFile) {
    const file = await getFileAsync(item as FileSystemFileEntry);
    return [file];
  } else if (item.isDirectory) {
    const files: File[] = [];

    // Get folder contents via native API
    // Read more at:
    // https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryEntry/createReader
    const dirReader = (item as FileSystemDirectoryEntry).createReader();

    // readEntries only returns a maximum of 100 entries per call.
    // https://stackoverflow.com/questions/23823548
    let entries = await readEntriesAsync(dirReader);
    while (entries.length !== 0) {
      for (let i = 0; i < entries.length; i++) {
        const recursiveFiles = await recursiveTreeFollow(entries[i] as FileSystemEntry, path + item.name + '/');
        files.push(...recursiveFiles);
      }
      entries = await readEntriesAsync(dirReader);
    }
    return files;
  }
  return [];
};

/**
 * dropFiles
 * @description handle the files drag and drop functionality
 * @param {React.DragEvent<HTMLInputElement>} event drag event
 * @param {string} path parent path
 * @return {Promise<Array<File>>} a file list
 */
export const dropFiles = async (event: React.DragEvent<HTMLInputElement>): Promise<Array<File>> => {
  const items = event.dataTransfer.items;
  event.preventDefault();

  const files: File[] = [];

  for (let i = 0; i < items.length; i++) {
    // webkitGetAsEntry is where the magic happens
    const item = items[i]?.webkitGetAsEntry();
    if (item && recursiveTreeFollow) {
      const recursiveFiles = await recursiveTreeFollow(item);
      files.push(...recursiveFiles);
    }
  }

  return files;
};
