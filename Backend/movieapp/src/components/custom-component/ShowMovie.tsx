"use client"
import React, { ChangeEvent, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Car } from 'lucide-react';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import * as actions from '@/actions'
import { useActionState } from 'react';

interface MovieProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

const ShowMovie = ({ data }: { data: MovieProps }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [updatedMovie, setUpdatedMovie] = useState({ ...data });

  const deleteAction = async (prevState: { error?: string } | null, formData: FormData) => {
    try {
      await actions.deleteMovie(formData);
      return null;
    } catch (e: any) {
      return { error: e.message };
    }
  };

  const editAction = async (prevState: { error?: string } | null, formData: FormData) => {
    try {
      await actions.editMovie(formData);
      setOpenDialog(false);
      return null;
    } catch (e: any) {
      return { error: e.message };
    }
  };

  const [deleteState, deleteDispatch] = useActionState(deleteAction, null);
  const [editState, editDispatch] = useActionState(editAction, null);

  const handleUpdateMovie = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof MovieProps
  ) => {
    setUpdatedMovie((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Card className="w-">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-40 object-cover rounded"
        />
        <p className="mt-2">{data.description}</p>

        {/* Delete Button */}
        <form action={deleteDispatch} className="mt-4">
          <Input type="hidden" name="movieID" value={data.id} />
          <Button className="bg-red-500 px-4 py-2 text-white">Delete</Button>
          {deleteState?.error && <p className="text-red-500">{deleteState.error}</p>}
        </form>

        {/* Edit Dialog */}
        <Dialog
          open={openDialog}
          onOpenChange={() => setOpenDialog(!openDialog)}
        >
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-2">
              Edit
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Movie</DialogTitle>

              <form className="space-y-4" action={editDispatch}>
                <div>
                  <Label>Title</Label>
                  <Input
                    type="text"
                    name="title"
                    value={updatedMovie.title}
                    onChange={(e) => handleUpdateMovie(e, "title")}
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <textarea
                    name="description"
                    value={updatedMovie.description}
                    onChange={(e) => handleUpdateMovie(e, "description")}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <Label>Image URL</Label>
                  <Input
                    type="text"
                    name="imageUrl"
                    value={updatedMovie.image}
                    onChange={(e) => handleUpdateMovie(e, "image")}
                  />
                </div>

                <Input type="hidden" name="movieID" value={data.id} />
                <Button type="submit">
                  Save
                </Button>
                {editState?.error && <p className="text-red-500">{editState.error}</p>}
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ShowMovie