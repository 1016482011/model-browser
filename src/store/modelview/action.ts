import { ActionCreator } from "redux";
import {
  modelViewInitAction,
  SetModelToolAction,
  SetModelTreeAction,
  SetSideActiveAction,
  ActionType,
  ModelViewState
} from "./types";
import { Bustard } from "bustard";
import { Loader, TreeLoader } from "bustard/lib/tools";

/**saga action */

export const modelViewInit: ActionCreator<modelViewInitAction> = () => ({
  type: ActionType.GET_MODELTREE
});

/**action */

export const setModelTool: ActionCreator<SetModelToolAction> = (
  modelTool: Bustard,
  bustardLoader: Loader
) => ({
  type: ActionType.SET_MODELTOOL,
  modelTool: {
    modelTool,
    bustardLoader
  }
});

export const setModelTree: ActionCreator<SetModelTreeAction> = (
  treeData: ModelViewState[]
) => ({
  type: ActionType.SET_MODELTREE,
  treeData
});

export const setSideActive: ActionCreator<SetSideActiveAction> = (
  active: string
) => ({
  type: ActionType.SET_SIDEACTIVE,
  active
});
