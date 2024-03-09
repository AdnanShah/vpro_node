import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm"
import { User } from "./User";
import { FolderItem } from "./FolderItem";

enum FolderType {
    MERITVE = 'meritve',
    TEHNOLOGIJA = 'tehnologija',
    KONTROLNI_PLAN = 'kontrolni plan',
    NAPAKE = 'vdrževalci napake',
    USERS = 'USERS',
    DEFAULT = 'null',
}

@Entity()
export class Folder {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "fk_user_id" })
    fk_user_id: User;

    @ManyToOne(() => Folder, folder => folder.children)
    @JoinColumn({ name: "fk_parent_folder_id" })
    parent_folder: Folder; 

    @OneToMany(() => FolderItem, folderItem => folderItem.fk_folder_id)
    folder_items: FolderItem[];

    @OneToMany(() => Folder, folder => folder.parent_folder)
    children: Folder[]; 

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null  
    })
    title: string; 

    @Column({
        type: "boolean",
        collation: "utf8_slovenian_ci",
        default: false  
    })
    has_children: boolean;
    
    @Column({
        type: 'enum',
        enum: FolderType,
        default: FolderType.DEFAULT
    })
    type: FolderType;

    @Column({
        type: "date",
        collation: "utf8_slovenian_ci",
        default: null
    })
    updated_at: Date;

    @Column({
        type: "date",
        collation: "utf8_slovenian_ci",
        default: null
    })
    created_at: Date;
}