import { Component } from '@angular/core';
import { ITreeOptions, TREE_ACTIONS } from 'angular-tree-component';
import { TreeModel, TreeNode } from 'angular-tree-component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tree',
  template: '<tree-root #tree [nodes]="nodes" [options]="options"></tree-root>'
})

export class AppTreeComponent {
  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1' },
        {
          id: 6,
          name: 'child2.2',
          children: [
            { id: 7, name: 'subsub' }
          ]
        }
      ]
    }
  ];
  options: ITreeOptions = {
    actionMapping: {
      mouse: {
        click: (tree: TreeModel, node: TreeNode, $event: any) => {
          this.selectNode(tree, node, $event);
        }
      }
    }
  };

  constructor(private router: Router) {

  }

  selectNode(tree: TreeModel, node: TreeNode, $event: any): void {
    TREE_ACTIONS.SELECT(tree, node, $event);
    console.log('child2');
    this.router.navigateByUrl('/child2', {replaceUrl: true});
  }
}
