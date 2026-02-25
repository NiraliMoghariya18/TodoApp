import { TodoItem } from "../screen/AddItemsScreen";

interface RootScreen {
    MainScreen:undefined;
    RegistrationScreen:undefined
LoginScreen:undefined
}


export type TabRootScreen={
    Items:{
  id: string;
  title: string;
  description: string;
  category: string;
  assignedTo: string;
  isCompleted: boolean;
  createdAt: string;
  editedAt: string | null;
  userId?: string;
    }
    AddItems?:{
        item?:TodoItem
       isEdit?:boolean
    }
    ApiCall: undefined;
}

export type DrawerRootScreen = {
    TabNavigation:undefined
}

export type StackRootScreen={
    MainScreen:undefined
    RegistrationScreen:undefined
    LoginScreen:undefined
    DrawerNavigation:undefined
    ItemsDetails:{
        item:TodoItem
    }
}