import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface TableInfo {
  heading: string[];
  body: string[][];
}

interface TableDynamicProps {
  tableInfo: TableInfo;
  setTableInfo: React.Dispatch<React.SetStateAction<TableInfo>>;
  setLink: React.Dispatch<React.SetStateAction<string[]>>;
  link: string[];
}

const TableDynamic = (props: TableDynamicProps) => {
  const { tableInfo, setTableInfo, link, setLink } = props;

  const addColumn = () => {
    setTableInfo((prev) => ({
      ...prev,
      heading: [...prev.heading, ""],
      body: prev.body.map((row) => [...row, ""]),
    }));
  };

  const deleteColumn = () => {
    if (tableInfo.heading.length === 0) return;
    setTableInfo((prev) => {
      const newHeading = prev.heading.slice(0, -1);
      const newBody = prev.body.map((row) => row.slice(0, -1));
      return {
        heading: newHeading,
        body: newBody,
      };
    });
  };

  const addRow = () => {
    const newRow = Array(tableInfo.heading.length).fill("");
    setTableInfo((prev) => ({
      ...prev,
      body: [...prev.body, newRow],
    }));
  };

  const deleteRow = (rowIndex: number) => {
    setTableInfo((prev) => ({
      ...prev,
      body: prev.body.filter((_, index) => index !== rowIndex),
    }));
  };

  const addLink = () => {
    setLink((prev) => [...prev, ""]);
  };

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...link];
    newLinks[index] = value;
    setLink(newLinks);
  };

  const handleHeaderChange = (index: number, value: string) => {
    const newHeading = [...tableInfo.heading];
    newHeading[index] = value;
    setTableInfo((prev) => ({ ...prev, heading: newHeading }));
  };

  const handleCellChange = (
    rowIndex: number,
    cellIndex: number,
    value: string
  ) => {
    const newBody = [...tableInfo.body];
    newBody[rowIndex][cellIndex] = value;
    setTableInfo((prev) => ({ ...prev, body: newBody }));
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Label>Table</Label>
        <div className="flex gap-4">
          <Button type="button" className="bg-gray-500" onClick={addColumn}>
            Add Column
          </Button>
          <Button type="button" className="bg-gray-500" onClick={addRow}>
            Add Row
          </Button>
          <Button type="button" onClick={deleteColumn} variant="destructive">
            Delete Column
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              {tableInfo.heading.map((header, i) => (
                <TableHead key={i}>
                  <Input
                    type="text"
                    placeholder="Enter the Header"
                    value={header}
                    onChange={(e) => handleHeaderChange(i, e.target.value)}
                  />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableInfo.body.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Textarea
                      placeholder="Enter the value"
                      value={cell}
                      onChange={(e) =>
                        handleCellChange(rowIndex, cellIndex, e.target.value)
                      }
                    />
                  </TableCell>
                ))}
                {row.length > 0 && ( // Show Delete Row button only if the row exists
                  <TableCell>
                    <Button
                      type="button"
                      onClick={() => deleteRow(rowIndex)}
                      variant="destructive"
                    >
                      Delete Row
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <Label>Links</Label>
        <div>
          <Button type="button" className="bg-gray-500" onClick={addLink}>
            Click to Add Link
          </Button>
          <Table>
            <TableBody>
              {link.map((linkValue, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell>
                    <Input
                      type="text"
                      value={linkValue}
                      onChange={(e) =>
                        handleLinkChange(rowIndex, e.target.value)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TableDynamic;
