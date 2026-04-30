// @ts-nocheck
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { updatedNoteSchema } from '../../validations/validAdminNote';
import axiosInstance from '../../api/axiosInstance';

const AdminNotes = ({ studentData }) => {
    const [isEditing, setIsEditing] = useState(false);

    const storageKey = `admin_note_${studentData.id}`;
    const [currentNote, setCurrentNote] = useState(() => {
        // أول ما الـ component يحمل، يشوف فيه نوتس متسجلة للطالب ده ولا لأ
        return localStorage.getItem(storageKey) || "";
    });

    const { handleSubmit, register, formState: {errors, isSubmitting }, reset } = useForm({
        mode: 'onChange',
        resolver: zodResolver(updatedNoteSchema)
    });
    const onSubmit = async ({updatedNote}) =>{
        setCurrentNote(updatedNote);
        setIsEditing(false)
        try {
            await axiosInstance.put(`Admins/update-current-note?studentId=${studentData.id}&updated_Note=${updatedNote}`);

            // لو نجح، احفظيها في المتصفح
            localStorage.setItem(storageKey, updatedNote);
            
            setCurrentNote(updatedNote);
            setIsEditing(false);
            reset({ updatedNote: updatedNote });
        } catch (error) {
            console.error("Update Note Error:", error);
        }
    }

    return (
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
            <Typography variant='body2' sx={{ color: "#00796B", fontSize: "18px", fontWeight: 600, mt: 5, mb: 1 }}>
                Admin Notes
            </Typography>
            <Box  sx={{ padding: "2% 3%", boxShadow: "1px 1px 5px rgba(189, 189, 189, 0.3)", }}>
                { currentNote !== "" ? (
                    <>
                        <Typography variant='body2' sx={{ color: "#64748B", fontSize: "16px", fontWeight: 600, mb: 1}}>
                            Current Note
                        </Typography>
                        <Box sx={{ bgcolor: "#eef1f4", borderRadius: 1 }}>
                            <Typography variant='body2' sx={{ color: "#475569", mb: 2, p: 1.5,  }}>
                                "{currentNote}"
                            </Typography>
                        </Box>
                    </>) : (
                        !isEditing &&(
                            <Box sx={{ bgcolor: "#eef1f4", borderRadius: 1 }}>
                                <Typography variant='body2' sx={{ color: "#475569", mb: 2, p: 1.5, textAlign: "center" }}>
                                    "Add Some Notes."
                                </Typography>
                            </Box>
                        )
                    )
                }
                { isEditing && (
                    <>
                    <Typography variant='body2' sx={{ color: "#64748B", fontSize: "16px", fontWeight: 600, mb: 1, mt: 2}}>
                        Update Note
                    </Typography>
                    <TextField
                    sx={{ mb: .5 }}
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Enter a new note for this student..."
                    {...register("updatedNote")}
                    error={!!errors.updatedNote}
                    />
                    <Typography variant='body2' sx={{ color: "#d32f2f", mb: 2 }}>{errors.updatedNote?.message}</Typography>
                    </>
                )}
                <Button type='submit' onClick={(e) => {
                if(!isEditing){
                    e.preventDefault()
                    setIsEditing(true)
                    reset()
                }}} disabled={isSubmitting} variant="contained" sx={{ width: "100%", textTransform: "capitalize"}}>
                    {isEditing ? "Save Note" : currentNote !== "" ? "Update Current Note" : "Add Note"}
                </Button>
                { isEditing && (
                    <Button onClick={() => {
                        setIsEditing(!isEditing)
                        reset()
                    }} variant="outlined" sx={{ color: "#64748B",  border: "1px solid #64748B", width: "100%", textTransform: "capitalize", mt: 2}}>
                        Discard Changes
                    </Button>
                )}
            </Box>
        </Box>
    )
}

export default AdminNotes;