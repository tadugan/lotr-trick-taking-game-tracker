import { useState, useEffect, useCallback } from 'react';
import {
  loadSaves,
  deleteSave as deleteSaveById,
  updateSave as updateSaveById,
} from './storage';
import type { SaveFile } from '../types';

export function useSaves() {
  const [saves, setSaves] = useState<SaveFile[]>([]);

  useEffect(() => {
    setSaves(loadSaves());
  }, []);

  const deleteSave = useCallback((id: string) => {
    deleteSaveById(id);
    setSaves(loadSaves());
  }, []);

  const updateSave = useCallback((save: SaveFile) => {
    updateSaveById(save);
    setSaves(loadSaves());
  }, []);

  const refresh = useCallback(() => {
    setSaves(loadSaves());
  }, []);

  return { saves, deleteSave, updateSave, refresh };
}
