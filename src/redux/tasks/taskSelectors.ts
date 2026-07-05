import { createSelector } from "@reduxjs/toolkit";
import { taskAdapter } from "./taskAdapter";
import { RootState } from "../store";

const selectors = taskAdapter.getSelectors<RootState>(
  (state) => state.tasks
);

export const selectAllTasks = selectors.selectAll;

export const selectTaskEntities =
  selectors.selectEntities;

export const selectTaskById =
  selectors.selectById;

export const selectLoading = (
  state: RootState
) => state.tasks.loading;

export const selectError = (
  state: RootState
) => state.tasks.error;

export const selectSearch = (
  state: RootState
) => state.tasks.search;

export const selectStatusFilter = (
  state: RootState
) => state.tasks.statusFilter;

export const selectTypeFilter = (
  state: RootState
) => state.tasks.typeFilter;
export const selectSortOrder = (
  state: RootState
) => state.tasks.sortOrder;

export const selectSelectedTaskId = (
  state: RootState
) => state.tasks.selectedTaskId;

export const selectIsCacheStale = (
  state: RootState
) => state.tasks.isCacheStale;
export const selectFilteredTasks = createSelector(
  [
    selectAllTasks,
    selectSearch,
    selectStatusFilter,
    selectTypeFilter,
    selectSortOrder
  ],
  (tasks, search, status, type, sortOrder) => {
   
    const filtered = tasks.filter((task) => {
    
      const matchesSearch = (task.title || '')
        .toLowerCase()
        .includes((search || '').toLowerCase());

      
      const matchesStatus =
        !status || 
        status === 'All Status' || 
        (task.status || '').toLowerCase() === status.toLowerCase();

     
      const matchesType =
        !type || 
        type === 'All Types' || 
        (task.type || '').toLowerCase() === type.toLowerCase();

      return matchesSearch && matchesStatus && matchesType;
    });

    
    return [...filtered].sort((a, b) => {
      const activeSort = sortOrder || 'updatedAt';

      if (activeSort === 'title') {
        const titleA = a.title || 'zzz';
        const titleB = b.title || 'zzz';
        return titleA.localeCompare(titleB);
      }
      
      
      const timeA = Number(a.updatedAt) || 0;
      const timeB = Number(b.updatedAt) || 0;
      return timeB - timeA;
    });
  }
);