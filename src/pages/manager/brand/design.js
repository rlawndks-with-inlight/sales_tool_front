
import { Avatar, Button, Card, CardHeader, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Stack, Tab, Tabs, TextField, TextareaAutosize, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Row, themeObj } from "src/components/elements/styled-components";
import { useSettingsContext } from "src/components/settings";
import { Upload } from "src/components/upload";
import { base64toFile, getAllIdsWithParents } from "src/utils/function";
import styled from "styled-components";
import { defaultManagerObj, react_quill_data } from "src/data/manager-data";
import { axiosIns } from "src/utils/axios";
import { toast } from "react-hot-toast";
import { useModal } from "src/components/dialog/ModalProvider";
import dynamic from "next/dynamic";
import axios from "axios";
import { useAuthContext } from "src/auth/useAuthContext";
import ManagerLayout from "src/layouts/manager/ManagerLayout";
import { apiManager } from "src/utils/api-manager";
import _ from "lodash";
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})


const DisignEdit = () => {
    const { setModal } = useModal()
    const { themeMode, themeDnsData } = useSettingsContext();
    const { user } = useAuthContext();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState(0);
    const [item, setItem] = useState({
        banners: []
    });
    const tab_list = [
        {
            value: 0,
            label: '배너이미지'
        },
        {
            value: 1,
            label: '색상'
        },
    ]
    const handleDropMultiFile = (acceptedFiles) => {
        let banners = [...item.banners];
        for (var i = 0; i < acceptedFiles.length; i++) {
            banners.push({
                banner_file: Object.assign(acceptedFiles[i], {
                    preview: URL.createObjectURL(acceptedFiles[i])
                }),
            })
        }
        setItem({ ...item, ['banners']: banners })
    };
    const handleRemoveFile = (inputFile) => {
        let banners = [...item.banners];
        let find_index = _.findIndex(banners.map(img => { return img.banner_file }), {
            path: inputFile.path,
            preview: inputFile.preview
        });

        if (find_index < 0) {
            for (var i = 0; i < banners.length; i++) {
                if (banners[i]?.banner_img == inputFile) {
                    find_index = i;
                }
            }
        }
        if (find_index >= 0) {
            if (banners[find_index]?.id) {
                banners[find_index].is_delete = 1;
            } else {
                banners.splice(find_index, 1);
            }
            setItem({ ...item, ['banners']: banners })
        }
    };
    const handleRemoveAllFiles = () => {
        let banners = [...item.banners];
        banners = [];
        setItem({ ...item, ['banners']: banners })
    };
    const onSave = async () => {
        let result = undefined
        result = await apiManager('brands/designs', 'update', { ...item, id: themeDnsData?.id });
    }
    return (
        <>
            <Row style={{ margin: '0 0 1rem 0', columnGap: '0.5rem' }}>
                {tab_list.map((tab) => (
                    <Button
                        variant={tab.value == currentTab ? 'contained' : 'outlined'}
                        onClick={() => {
                            setCurrentTab(tab.value)
                        }}
                    >{tab.label}</Button>
                ))}
            </Row>
            <Grid container spacing={3}>
                {currentTab == 0 &&
                    <>
                        <Grid item xs={12} md={12}>
                            <Card sx={{ p: 2, height: '100%' }}>
                                <Stack spacing={3}>
                                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                        배너이미지
                                    </Typography>
                                    <Stack spacing={1}>
                                        <Upload
                                            multiple
                                            thumbnail={true}
                                            files={item.banners.map(img => {
                                                if (img.is_delete == 1) {
                                                    return undefined;
                                                }
                                                if (img.banner_img) {
                                                    return img.banner_img
                                                } else {
                                                    return img.banner_file
                                                }
                                            }).filter(e => e)}
                                            onDrop={(acceptedFiles) => {
                                                handleDropMultiFile(acceptedFiles)
                                            }}
                                            onRemove={(inputFile) => {
                                                handleRemoveFile(inputFile)
                                            }}
                                            onRemoveAll={() => {
                                                handleRemoveAllFiles();
                                            }}
                                            fileExplain={{
                                                width: '(1200x600 추천)'//파일 사이즈 설명
                                            }}
                                            imageSize={{ //썸네일 사이즈
                                                width: 200,
                                                height: 200
                                            }}
                                        />
                                    </Stack>
                                </Stack>
                            </Card>
                        </Grid>
                    </>}
                {currentTab == 1 &&
                    <>
                    
                    </>}
                <Grid item xs={12} md={12}>
                    <Card sx={{ p: 3 }}>
                        <Stack spacing={1} style={{ display: 'flex' }}>
                            <Button variant="contained" style={{
                                height: '48px', width: '120px', marginLeft: 'auto'
                            }} onClick={() => {
                                setModal({
                                    func: () => { onSave() },
                                    icon: 'material-symbols:edit-outline',
                                    title: '저장 하시겠습니까?'
                                })
                            }}>
                                저장
                            </Button>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}
DisignEdit.getLayout = (page) => <ManagerLayout>{page}</ManagerLayout>;
export default DisignEdit