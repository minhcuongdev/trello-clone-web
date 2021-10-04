import React, { useEffect, useRef, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form, Button } from 'react-bootstrap'
import { cloneDeep } from 'lodash'
import './Column.scss'

import Card from 'components/Card/Card'
import ConfirmModal from 'components/common/ConfirmModal'
import { mapOrder } from 'utilities/sorts'
import { MODAL_ACTION_CONFIRM } from 'utilities/constants'
import { saveContentAfterEnter, selectAllInlineText } from 'utilities/contentEditable'
import { createNewCard, updateColumn } from 'actions/API'


function Column(props) {
    const { column, onCardDrop, onUpdateColumnState } = props
    const cards = mapOrder(column.cards, column.cardOrder, '_id')

    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)

    const [openNewCartForm, setOpenNewCartForm] = useState(false)
    const toggleOpenNewCartForm = () => {
        setOpenNewCartForm(!openNewCartForm)
    }

    const [newCartTile, setNewCartTitle] = useState('')
    const onNewCartTitleChange = (e) => {
        setNewCartTitle(e.target.value)
    }

    const onConfirmModalAction = (type) => {
        if (type === MODAL_ACTION_CONFIRM) {
            const newColumn = {
                ...column,
                _destroy: true
            }

            updateColumn(newColumn._id, newColumn)
                .then(col => {
                    onUpdateColumnState(col)
                })
        }
        toggleShowConfirmModal()
    }

    const [columnTitle, setColumnTile] = useState('')

    useEffect(() => {
        setColumnTile(column.title)
    }, [column.title])

    const newCartTextareaRef = useRef(null)
    useEffect(() => {
        if (newCartTextareaRef && newCartTextareaRef.current) {
            newCartTextareaRef.current.focus()
            newCartTextareaRef.current.select()
        }
    }, [openNewCartForm])

    const handleColumnTitleChange = (e) => {
        setColumnTile(e.target.value)
    }

    const handleColumnTitleBlur = () => {
        const newColumn = {
            ...column,
            title: columnTitle
        }

        if (column.title !== columnTitle) {
            updateColumn(newColumn._id, newColumn)
                .then(col => {
                    col.cards = newColumn.cards
                    onUpdateColumnState(col)
                })
        }

    }

    const addNewCart = () => {
        if (!newCartTile) {
            newCartTextareaRef.current.focus()
            return
        }

        const newCartToAdd = {
            boardId: column.boardId,
            columnId: column._id,
            title: newCartTile.trim()
        }

        createNewCard(newCartToAdd)
            .then(card => {
                let newColumn = cloneDeep(column)
                newColumn.cards.push(card)
                newColumn.cardOrder.push(card._id)

                onUpdateColumnState(newColumn)
                setNewCartTitle('')
                toggleOpenNewCartForm()
            })
    }

    return (
        <div className="column">
            <header className='column-drag-handle'>
                <div className="column-title">
                    <Form.Control
                        size="sm"
                        type="text"
                        className="trello-content-editable"
                        value={columnTitle}
                        spellCheck="false"
                        onClick={selectAllInlineText}
                        onChange={handleColumnTitleChange}
                        onKeyDown={saveContentAfterEnter}
                        onBlur={handleColumnTitleBlur}
                        onMouseDown={e => e.preventDefault()}
                    />
                </div>
                <div className="column-dropdown-actions">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" size="sm" className="dropdown-btn"></Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={toggleOpenNewCartForm}>Add Cart</Dropdown.Item>
                            <Dropdown.Item onClick={toggleShowConfirmModal}>Remove Column</Dropdown.Item>
                            <Dropdown.Item>Move all cart in this column (beta)...</Dropdown.Item>
                            <Dropdown.Item>Active all cart in this column (beta)...</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </header>
            <div className="card-list">
                <Container
                    groupName="col"
                    onDrop={dropResult => onCardDrop(column._id, dropResult)}
                    getChildPayload={index => cards[index]}
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'card-drop-preview'
                    }}
                    dropPlaceholderAnimationDuration={200}
                >
                    {cards.map((card, index) => (
                        <Draggable key={index}>
                            <Card card={card} />
                        </Draggable>
                    ))}
                    {openNewCartForm &&
                        <div className="add-new-cart-area">
                            <Form.Control
                                size="sm"
                                as="textarea"
                                rows="3"
                                placeholder="Enter the title for this cart ..."
                                className="textarea-enter-new-cart"
                                ref={newCartTextareaRef}
                                value={newCartTile}
                                onChange={onNewCartTitleChange}
                                onKeyDown={e => (e.key === 'Enter') && addNewCart()}
                            />
                        </div>
                    }
                </Container>
            </div>
            <footer>
                {openNewCartForm &&
                    <div className="add-new-cart-action">
                        <Button variant="success" size="sm" onClick={addNewCart}>Add Cart</Button>
                        <span className="cancel-icon" onClick={toggleOpenNewCartForm}>
                            <i className='icon fa fa-trash'></i>
                        </span>
                    </div>
                }
                {!openNewCartForm &&
                    <div className="footer-actions" onClick={toggleOpenNewCartForm}>
                        <i className="icon fa fa-plus" />
                        Add another card
                    </div>
                }
            </footer>
            <ConfirmModal
                title="Remove Column"
                content={`Are you sure you want to remove <strong>${column.title} !</strong></br> All related card will also be removed`}
                show={showConfirmModal}
                onAction={onConfirmModalAction} />
        </div >
    )
}

export default Column