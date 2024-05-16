import { Component } from '@angular/core';
import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTable
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {Theme} from "../../../Models/theme";
import {MatDialog} from "@angular/material/dialog";
import {ThemeService} from "../../../Services/theme.service";
import {ThemeDialogComponent} from "./theme-dialog/theme-dialog.component";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [
    MatHeaderCell,
    MatButton,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatHeaderCellDef,
    MatTable,
    MatIcon
  ],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.css'
})
export class ThemeComponent {
  displayedColumns: string[] = ['id','title','department', 'edit', 'delete'];
  dataSource: Theme[] = [];

  constructor(public dialog: MatDialog, private themeService: ThemeService) {
    this.fetchThemes();
  }

  fetchThemes(): void {
    this.themeService.getAll().subscribe(
      (data: Theme[]) => {
        this.dataSource = data;
        console.log(data)
      }
    );
  }

  openDialog(theme?: Theme): void {
    const dialogRef = this.dialog.open(ThemeDialogComponent, {
      width: '300px',
      data: { theme: theme ? { ...theme } : new Theme() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchThemes();
      }
    });
  }

  deleteTheme(theme: Theme): void {
    this.themeService.Delete(theme.id).subscribe(() => {
      this.fetchThemes();
    });
  }
}
