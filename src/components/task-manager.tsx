import { useMemo, useState } from 'react';

import { useGetItemsQuery } from '../services/api-service';
import Header from './header';
import ItemList from './item-list';
import MarkAllAsUnpacked from './mark-all-as-unpacked';
import NewItem from './new-item';
import {
    createItem,
    filterItems,
    getInitialItems,
    removeItem,
    updateItem,
  } from '../lib/items';

const TaskManager = () => {

    const { data, currentData, isLoading, isError, isFetching, isSuccess, isUninitialized } = useGetItemsQuery(undefined, {
        pollingInterval: 2000,
    });
    // data is the data returned from the API
    // currentData is the data returned from the API, but only if it's different from the previous data
    // isLoading is true when the query is in the process of fetching data - only on 1st load
    // isFetching is true when a request has been initiated but not yet resolved - UPDATING THE DATA after first load
    // isUninitialized is true when the query has not yet been executed
    // isSuccess is true when the query has successfully fetched data
    // isError is true when the query has failed to fetch data



    const [items, setItems] = useState(getInitialItems());
    // const items = useMemo(() => data?.items || [], [data]);

    const add = (name: string) => {
        const item = createItem(name);
        setItems([...items, item]);
      };

      const update = (id: string, updates: any) => {
        setItems(updateItem(items, id, updates));
      };

      const remove = (id: string) => {
        setItems(removeItem(items, id));
      };

      const unpackedItems = filterItems(items, { packed: false });
      const packedItems = filterItems(items, { packed: true });

      const markAllAsUnpacked = () => {
        return setItems(items.map((item) => ({ ...item, packed: false })));
      };

    console.log('data', data)


  return (
    <>
        <div className="flex flex-col gap-8 p-8 mx-auto bg-black border-8 border-white shadow-2xl lg:max-w-6xl rounded-xl">
          <div className="flex items-center justify-between">
              <div>
                  <Header count={0} />
              </div>
                   <div>
                 <div> {isUninitialized && <div className="bg-pink-200">Uninitialized...</div>}</div>
                  <div> {isLoading && <div className="bg-blue-200">Loading...</div>}</div>
                  <div> {isFetching && <div className="bg-orange-200">Updating...</div>}</div>
                  <div> {isError && <div className="bg-red-200">Error...</div>}</div>
                  <div> {isSuccess && <div className="bg-green-200">Success...</div>}</div>
                   </div>
          </div>
          <NewItem addItem={add} />
          <section className="flex flex-col gap-8 md:flex-row">
          <ItemList
              title="Unpacked Items"
              items={unpackedItems}
              update={update}
              remove={remove}
            />
            <ItemList
              title="Packed Items"
              items={packedItems}
              update={update}
              remove={remove}
            />
          </section>
          <MarkAllAsUnpacked />
        </div>
    </>
  );
};

export default TaskManager;
